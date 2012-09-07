from django import template
from site_settings.models import SiteSetting
from page.models import Page
from django.core import serializers
from django.shortcuts import render_to_response