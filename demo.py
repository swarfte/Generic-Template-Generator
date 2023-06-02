import json
import os
import sys


class AbstractDemo(object):
    def __init__(self, file_name: str, file_extension: str, number_of_object: int = 3) -> None:
        self.file_name = file_name
        self.file_extension = file_extension
        self.number_of_object = number_of_object
        self.input_directory = os.getcwd() + "/output/"
        self.output_directory = os.getcwd() + "/demo/"
        self.file = self.load_file(
            self.file_name, self.file_extension)  # this is a json array
        self.output_data = []
        self.action()

    def action(self):
        self.pre_build_demo()
        self.build_demo()
        self.pre_write_file()
        self.write_file()

    def pre_build_demo(self):
        # override this method for different file type
        pass

    def load_file(self, file_name, file_extension):
        print("Loading file: " + file_name + "." + file_extension)
        with open(self.input_directory + file_name + "." + file_extension, "r") as file:
            return self.handle_loading_file(file)

    def build_demo(self):
        print("Creating demo file")
        count = 0
        while count < self.number_of_object:
            self.output_data.append(self.file[count])
            count += 1

    def pre_write_file(self):
        # override this method for different file type
        pass

    def write_file(self):
        with open(self.output_directory + self.file_name + "_demo" + "." + self.file_extension, "w") as file:
            self.handle_writing_file(file)

    def handle_loading_file(self, file):
        pass

    def handle_writing_file(self, file):
        pass


class jsonDemo(AbstractDemo):
    def __init__(self, file_name: str, file_extension: str, number_of_object: int = 3) -> None:
        super().__init__(file_name, file_extension, number_of_object)

    def handle_loading_file(self, file):
        return json.loads(file.read())

    def handle_writing_file(self, file):
        json.dump(self.output_data, file, indent=4)


class ndjsonDemo(AbstractDemo):
    def __init__(self, file_name: str, file_extension: str, number_of_object: int = 3) -> None:
        super().__init__(file_name, file_extension, number_of_object)

    def handle_loading_file(self, file):
        return file.readlines()

    def handle_writing_file(self, file):
        file.writelines(self.output_data)


class csvDemo(AbstractDemo):
    def __init__(self, file_name: str, file_extension: str, number_of_object: int = 3) -> None:
        super().__init__(file_name, file_extension, number_of_object + 1)  # +1 for header

    def handle_loading_file(self, file):
        return file.readlines()

    def handle_writing_file(self, file):
        file.writelines(self.output_data)


if __name__ == "__main__":

    file_name = sys.argv[1]
    file_extension = sys.argv[2]
    number_of_object = 3

    # if number of object is not specified, use default value 3
    try:
        number_of_object = int(sys.argv[3])
    except:
        print("Number of object is not specified, using default value 3")

    eval(file_extension + "Demo")(file_name, file_extension, number_of_object)
