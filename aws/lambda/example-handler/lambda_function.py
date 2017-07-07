
from helper_function import helper

# An example handler function
def handler(event, context):
    return {
        'message': 'Hello from Localhost',
        'helper': helper()
    }

