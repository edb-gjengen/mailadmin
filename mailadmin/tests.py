from django.test import TestCase
from mailadmin.api import DjangoPostfixDovecotAPI
import unittest


class APITest(TestCase):

    @unittest.skip("Not now")
    def test_listforwards(self):
        _api = DjangoPostfixDovecotAPI()
        params = dict(
            regex='^kak-*'
        )
        self.assertEqual(True, True)

    @unittest.skip("Not now")
    def test_addforward(self):
        _api = DjangoPostfixDovecotAPI()
        self.assertEqual(True, True)

    @unittest.skip("Not now")
    def test_delforward(self):
        _api = DjangoPostfixDovecotAPI()
        self.assertEqual(True, True)
