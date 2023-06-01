import json
import os
import sys

file_name = sys.argv[1]
file_extension = sys.argv[2]


class AbstractMerge(object):
    def __init__(self, file_name: str, file_extension: str) -> None:
        self.file_name = file_name
        self.file_extension = file_extension
        self.directory = os.getcwd() + "/output/"
        self.file_list = self.load_file([], file_name, file_extension)
        self.output_data = []
        self.merge()

    def load_file(self, file_list, file_name, file_extension):
        for root, dirs, files in os.walk(os.getcwd() + "/output/"):
            for file in files:
                if file.startswith(file_name) and file.endswith(file_extension):
                    file_list.append(file)
        return file_list

    def merge(self):
        pass


class jsonMerge(AbstractMerge):
    def __init__(self, file_name: str, file_extension: str) -> None:
        super().__init__(file_name, file_extension)

    def merge(self):
        for file in self.file_list:
            print(file)
            with open(self.directory + file, "r") as f:
                temp_data = f.read()
                self.output_data.append(json.loads(temp_data))

        with open(self.directory + self.file_name + "." + self.file_extension, "w") as f:
            json.dump(self.output_data, f,indent=4)

        # remove the old file
        for file in self.file_list:
            os.remove(self.directory + file)


eval(f"{file_extension}Merge(file_name, file_extension)")
