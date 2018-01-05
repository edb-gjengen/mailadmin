# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
import ldap
from django_auth_ldap.config import LDAPSearch, PosixGroupType

BASE_DIR = os.path.dirname(os.path.dirname(__file__))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.7/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'g658807^w2!kzsdb_wznxo$5xpjb2x(sfoub%l_ap77@@_zt&*'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Application definition
INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'bootstrapform',
    'mailadmin',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'mailadminsite.urls'

WSGI_APPLICATION = 'mailadminsite.wsgi.application'

# Database
# https://docs.djangoproject.com/en/1.7/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            # insert your TEMPLATE_DIRS here
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                # Insert your TEMPLATE_CONTEXT_PROCESSORS here or use this
                # list if you haven't customized them:
                'django.contrib.auth.context_processors.auth',
                'django.template.context_processors.debug',
                'django.template.context_processors.i18n',
                'django.template.context_processors.media',
                'django.template.context_processors.static',
                'django.template.context_processors.tz',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Internationalization
# https://docs.djangoproject.com/en/1.7/topics/i18n/
LANGUAGE_CODE = 'nb'
TIME_ZONE = 'Europe/Oslo'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.7/howto/static-files/
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.ManifestStaticFilesStorage'

LOGIN_REDIRECT_URL = '/lists/'

DPD_API_URL = 'http://localhost'
DPD_API_USERNAME = ""
DPD_API_PASSWORD = ""

NEUF_EMAIL_DOMAIN_NAME = 'stry.no'

AUTHENTICATION_BACKENDS = (
    'mailadmin.backends.LDAPEmailBackend',
    'mailadmin.backends.LDAPUsernameBackend',
    'django.contrib.auth.backends.ModelBackend',
)

# LDAP server URI and BIND_DN, same as db-settings
AUTH_LDAP_U_SERVER_URI = 'ldap://localhost/'
AUTH_LDAP_U_BIND_DN = 'cn=admin,dc=neuf,dc=no'
AUTH_LDAP_U_BIND_PASSWORD = 'toor'

# Basic user auth
AUTH_LDAP_U_USER_SEARCH = LDAPSearch("ou=People,dc=neuf,dc=no", ldap.SCOPE_ONELEVEL, "(uid=%(user)s)")
# Basic groups
AUTH_LDAP_U_GROUP_SEARCH = LDAPSearch("ou=Groups,dc=neuf,dc=no", ldap.SCOPE_ONELEVEL, "(objectClass=posixGroup)")
AUTH_LDAP_U_GROUP_TYPE = PosixGroupType()
# Mirror groups on each auth
AUTH_LDAP_U_MIRROR_GROUPS = True
# Group to user flag mappings
AUTH_LDAP_U_USER_FLAGS_BY_GROUP = {
    "is_active": "cn=dns-aktiv,ou=Groups,dc=neuf,dc=no",
    "is_staff": "cn=edb,ou=Groups,dc=neuf,dc=no",
    "is_superuser": "cn=edbadmin,ou=Groups,dc=neuf,dc=no"
}
# Group to profile flag mappings, not used.
AUTH_LDAP_U_PROFILE_FLAGS_BY_GROUP = {
    #"is_edb": "cn=edb,ou=Groups,dc=neuf,dc=no"
}
# User attribute mappings
AUTH_LDAP_U_USER_ATTR_MAP = {
    "first_name": "givenName",
    "last_name": "sn",
    "email": "mail",
}
# User profile attribute mappings
AUTH_LDAP_U_PROFILE_ATTR_MAP = {
    "home_directory": "homeDirectory"
}
# Allways update the django user object on authentication.
AUTH_LDAP_U_ALWAYS_UPDATE_USER = True

# Email auth
AUTH_LDAP_E_SERVER_URI = AUTH_LDAP_U_SERVER_URI
AUTH_LDAP_E_BIND_DN = AUTH_LDAP_U_BIND_DN
AUTH_LDAP_E_BIND_PASSWORD = AUTH_LDAP_U_BIND_PASSWORD

AUTH_LDAP_E_USER_SEARCH = LDAPSearch("ou=People,dc=neuf,dc=no", ldap.SCOPE_ONELEVEL, "(mail=%(user)s)")

AUTH_LDAP_E_GROUP_SEARCH = AUTH_LDAP_U_GROUP_SEARCH
AUTH_LDAP_E_GROUP_TYPE = AUTH_LDAP_U_GROUP_TYPE
AUTH_LDAP_E_MIRROR_GROUPS = AUTH_LDAP_U_MIRROR_GROUPS
AUTH_LDAP_E_USER_FLAGS_BY_GROUP = AUTH_LDAP_U_USER_FLAGS_BY_GROUP
AUTH_LDAP_E_PROFILE_FLAGS_BY_GROUP = AUTH_LDAP_U_PROFILE_FLAGS_BY_GROUP
AUTH_LDAP_E_USER_ATTR_MAP = AUTH_LDAP_U_USER_ATTR_MAP
AUTH_LDAP_E_PROFILE_ATTR_MAP = AUTH_LDAP_U_PROFILE_ATTR_MAP
AUTH_LDAP_E_ALWAYS_UPDATE_USER = AUTH_LDAP_U_ALWAYS_UPDATE_USER

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
    )
}

# Local settings
try:
    from .local_settings import *
except ImportError:
    pass
