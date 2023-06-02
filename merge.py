import json
import os
import sys


class AbstractMerge(object):
    def __init__(self, file_name: str, file_extension: str) -> None:
        self.file_name = file_name
        self.file_extension = file_extension
        self.directory = os.getcwd() + "/output/"
        self.file_list = self.load_file([], file_name, file_extension)
        self.output_data = []
        self.action()

    def action(self):
        # can override this method for addition action
        self.before_read_file()
        self.read_file()
        self.before_write_file()
        self.write_file()
        self.before_remove_old_file()
        self.remove_old_file()

    def load_file(self, file_list, file_name, file_extension):
        for root, dirs, files in os.walk(os.getcwd() + "/output/"):
            for file in files:
                if file.startswith(file_name) and file.endswith(file_extension):
                    file_list.append(file)
        return file_list

    def before_read_file(self):
        # override this method for different file type
        pass

    def read_file(self):
        print("reading file")
        for file in self.file_list:
            print(file)
            with open(self.directory + file, "r") as f:
                array_data = self.handle_reading_file(f)
                for data in array_data:
                    self.output_data.append(data)

    def before_write_file(self):
        # override this method for different file type
        pass

    def write_file(self):
        print("writing json file")
        with open(self.directory + self.file_name + "." + self.file_extension, "w") as f:
            self.handle_writing_file(f)

    def before_remove_old_file(self):
        # override this method for different file type
        pass

    def remove_old_file(self):
        print("removing old file")
        for file in self.file_list:
            self.handle_remove_old_file(self.directory, file)

    def handle_reading_file(self, file):
        # override this method for different file type
        pass

    def handle_writing_file(self, file):
        # override this method for different file type
        pass

    def handle_remove_old_file(self, directory, file):
        os.remove(directory + file)


class jsonMerge(AbstractMerge):
    def __init__(self, file_name: str, file_extension: str) -> None:
        super().__init__(file_name, file_extension)

    def handle_reading_file(self, file):
        return json.loads(file.read())

    def handle_writing_file(self, file):
        json.dump(self.output_data, file, indent=4)


class ndjsonMerge(AbstractMerge):
    def __init__(self, file_name: str, file_extension: str) -> None:
        super().__init__(file_name, file_extension)

    def handle_reading_file(self, file):
        return file.readlines()

    def handle_writing_file(self, file):
        file.writelines(self.output_data)


class csvMerge(AbstractMerge):
    def __init__(self, file_name: str, file_extension: str) -> None:
        super().__init__(file_name, file_extension)

    def before_read_file(self):
        with open(self.directory + self.file_list[0], "r") as f:
            self.output_data.append(f.readline())  # add the header

    def read_file(self):
        print("reading file")
        for file in self.file_list:
            print(file)
            with open(self.directory + file, "r") as f:
                array_data = self.handle_reading_file(f)
                for data in array_data[1:]:  # skip the header of each file
                    self.output_data.append(data)

    def handle_reading_file(self, file):
        return file.readlines()

    def handle_writing_file(self, file):
        file.writelines(self.output_data)


if __name__ == "__main__":

    file_name = sys.argv[1]
    file_extension = sys.argv[2]

    eval(f"{file_extension}Merge(file_name, file_extension)")
