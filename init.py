#!/usr/bin/env python3

## Task Application
## by Rafi Khan

# Import Modules
import argparse
import os.path
import pickle
from task import Task

# Load Tasks from local file
def load_tasks():
    if(os.path.isfile("data")):
       print("Found data")
       f = open('data', 'br')
       p = pickle.Unpickler(f)
       return p.load()
    else:
        return []

# Save Tasks to local file
def save_tasks(list):
    f = open('data', 'wb')
    p = pickle.Pickler(f)
    p.dump(list)
    print("Saved to data")

# Modify tasks
def add_task(name):
    task = Task(name)
    task_list.append(task)

def delete_task(name, list):
    new_list = []
    for task in list:
        if (task.name == name):
            print("Removed task:" + name)
            continue
        else:
            new_list.append(task)

    list = new_list

# Error
def error(cause):
    print("An error occurred: " + cause)
# Parse Arguments
parser = argparse.ArgumentParser(description="intuitive task management")
parser.add_argument("-a", "--add", nargs=1, help="adds a task")
parser.add_argument("-r", "--remove", nargs=1, help="removes a task")
parser.add_argument("-t", "--time", nargs=1, help="the time set for the task")

args = parser.parse_args()

print(args)

task_list = load_tasks()

if (args.action[0] == "new"):
    action = args.action
    if (len(action) > 1):
        print("Create new task: " + action[1])
        add_task(action[1])
        save_tasks(task_list)

    else:
        error("name of task not specified")


elif (args.action[0] == "remove"):
    action = args.action
    if (len(action) > 1):
        print("Delete task: " + action[1])
        delete_task(action[1], task_list)
        save_tasks(task_list)

    else:
        error("name of task not specified")

elif (args.action[0] == "print"):
    action = args.action
    if (len(action) == 1):
        print("Data: ")
        print(task_list)

