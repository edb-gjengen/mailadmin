from django.contrib.auth.models import User
from django.test import TestCase
# import unittest
from django.urls import reverse


class FrontendTest(TestCase):

    def setUp(self):
        self.user = User.objects.create(username='admin')
        self.client.force_login(user=self.user)

    def test_open_lists(self):
        response = self.client.get(reverse('lists'))
        self.assertEqual(response.status_code, 200)
