import requests
from django.conf import settings


class DjangoPostfixDovecotAPI(object):
    """
    django-postfix-dovecot-api

    https://git.neuf.no/edb/django-postfix-dovecot-api#tab-readme

    """
    def __init__(self, base_url=settings.DPD_API_URL, username=settings.DPD_API_USERNAME, password=settings.DPD_API_PASSWORD):
        self.base_url = base_url
        self.username = username
        self.password = password

    def _api(self, method, path, params=None, json=None):
        headers = {'content-type': 'application/json'}
        url = "{}{}".format(self.base_url, path)

        r = requests.request(
            method,
            url,
            params=params,
            auth=requests.auth.HTTPBasicAuth(self.username, self.password),
            json=json,
            headers=headers)

        r.raise_for_status()

        return r.json()

    def create_aliases(self, aliases):
        return self._api('POST', '/aliases/create_bulk/', json=aliases)

    def delete_aliases(self, aliases):
        return self._api('DELETE', '/aliases/delete_bulk/', json=aliases)

    def list_aliases_regex(self, regex):
        """ Limit aliases by regular expression and domain name """
        params = {
            'domain__name': settings.NEUF_EMAIL_DOMAIN_NAME,
            'source_regex': regex
        }
        return self._api(
            'GET',
            '/aliases/',
            params=params
        )