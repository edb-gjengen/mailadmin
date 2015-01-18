import requests
from django.conf import settings
import logging
from requests.exceptions import ConnectionError
from requests.auth import HTTPBasicAuth
from rest_framework import exceptions
from rest_framework import status
logger = logging.getLogger(__name__)


class DPDAPIException(exceptions.APIException):
    status_code = 503
    detail = 'Unknown error.'

    def __init__(self, status_code, detail):
        self.status_code = status_code
        self.detail = detail


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

        try:
            r = requests.request(
                method,
                url,
                params=params,
                auth=HTTPBasicAuth(self.username, self.password),
                json=json,
                headers=headers)
        except ConnectionError as e:
            msg = 'mxapi at {} unavailable {}'.format(url, unicode(e))
            logger.warning(msg)
            raise DPDAPIException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail={'error': msg})

        try:
            r.raise_for_status()
        except requests.exceptions.RequestException as e:
            logger.warning('mxapi errored {}'.format(e.response))
            try:
                raise DPDAPIException(status_code=e.response.status_code, detail=e.response.json())
            except ValueError:
                raise DPDAPIException(status_code=e.response.status_code, detail='mxapi fatal error')

        try:
            ret = r.json()
        except ValueError:
            return None

        return ret

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

    def list_domains(self, name=None):
        params = {}

        if name is not None:
            params['name'] = name

        return self._api(
            'GET',
            '/domains/',
            params=params
        )