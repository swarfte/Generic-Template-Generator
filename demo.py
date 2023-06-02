import json
import os
import sys

file_name = sys.argv[1]
file_extension = sys.argv[2]
number_of_object = 3

# if number of object is not specified, use default value 3
try:
    number_of_object = int(sys.argv[3])
except:
    pass


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
        self.create_demo()

    def load_file(self, file_name, file_extension):
        pass

    def create_demo(self):
        pass


class jsonDemo(AbstractDemo):
    def __init__(self, file_name: str, file_extension: str, number_of_object: int = 3) -> None:
        super().__init__(file_name, file_extension, number_of_object)

    def load_file(self, file_name, file_extension):
        print("Loading json file: " + file_name + "." + file_extension)
        with open(self.input_directory + file_name + "." + file_extension, "r") as file:
            return json.loads(file.read())

    def create_demo(self):
        print("Creating demo for json file")
        count = 0
        while count < self.number_of_object:
            self.output_data.append(self.file[count])
            count += 1

        with open(self.output_directory + self.file_name + "_demo" + "." + self.file_extension, "w") as file:
            json.dump(self.output_data, file, indent=4)


eval(file_extension + "Demo")(file_name, file_extension, number_of_object)
