base_url = 'https://localhost/json-api/cpanel'
username = "";
password = "";

# Local settings
try:
    from local_settings import *
except ImportError:
    pass
