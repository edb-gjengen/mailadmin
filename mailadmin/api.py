import requests
from django.conf import settings


class CPanel(object):
    """
    CPanel API

    https://documentation.cpanel.net/display/SDK/cPanel+API+2+-+Email
    https://documentation.cpanel.net/display/SDK/cPanel+API+1+-+Email
    """
    def __init__(self, base_url=settings.CP_API_URL, username=settings.CP_API_USERNAME, password=settings.CP_API_PASSWORD):
        self.base_url = base_url
        self.username = username
        self.password = password

    def api(self, module, function, params=None, version=2):
        generic = {
            'cpanel_jsonapi_user': self.username,
            'cpanel_jsonapi_module': module,
            'cpanel_jsonapi_func': function,
            'cpanel_jsonapi_apiversion': version,
        }
        if params is not None:
            params = dict(generic.items() + params.items())

        headers = {'content-type': 'application/json'}
        r = requests.get(
            self.base_url,
            params=params,
            headers=headers,
            auth=requests.auth.HTTPBasicAuth(self.username, self.password),
            verify=False)
        return r.json()