from django.test import TestCase
from mailadmin.api import CPanel
import unittest


class APITest(TestCase):

    @unittest.skip("Not now")
    def test_listforwards(self):
        server = CPanel()
        params = dict(
            domain='studentersamfundet.no',
            regex='kak-*'
        )
        res = server.api('Email', 'listforwards', params)
        self.assertIsInstance(res, dict)
        self.assertIn('cpanelresult', res)

    @unittest.skip("Not now")
    def test_addforward(self):
        server = CPanel()
        params = dict(
            domain='studentersamfundet.no',
            email='test.testesen',
            fwdopt='fwd',
            fwdemail='nikolaik@gmail.com'
        )
        res = server.api('Email', 'addforward', params)
        self.assertIsInstance(res, dict)
        self.assertIn('cpanelresult', res)
        cp_res = res['cpanelresult']
        self.assertIn('event', cp_res)
        self.assertIn('result', cp_res['event'])
        self.assertEqual(cp_res['event']['result'], 1)

    @unittest.skip("Not now")
    def test_delforward(self):
        server = CPanel()
        params = dict(
            forwarder='test.testesen@studentersamfundet.no=nikolaik@gmail.com',
        )
        res = server.api('Email', 'delforward', params, version=1)
        # FIXME: Does not work!
        self.assertIsInstance(res, dict)
        self.assertIn('event', res)
        self.assertIn('result', res['event'])
        self.assertEqual(res['event']['result'], 1)
