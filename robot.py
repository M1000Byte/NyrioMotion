from pyniryo2 import *

robot = NiryoRobot("172.20.21.191")
gripper_speed = 400


robot.arm.calibrate_auto()

robot.arm.move_joints([0,0,0,0,0,0])

robot.tool.open_gripper(gripper_speed) 
robot.tool.close_gripper(gripper_speed) 

robot.end()