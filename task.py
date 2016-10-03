## Task Application
## by Rafi Khan

class Task:
    def __init__(self, name, time=None):
        self.name = name
        self.time = time

    def __str__(self):
        return self.name

    def __repr__(self):
        return self.name


