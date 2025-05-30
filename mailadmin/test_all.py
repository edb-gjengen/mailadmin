from http import HTTPStatus

import pytest
from django.contrib.auth.models import User
from django.urls import reverse


@pytest.fixture
def user(db):  # noqa: ARG001
    return User.objects.create(username="admin")


def test_open_lists(user, client):
    client.force_login(user=user)
    response = client.get(reverse("lists"))
    assert response.status_code == HTTPStatus.OK  # noqa: S101
