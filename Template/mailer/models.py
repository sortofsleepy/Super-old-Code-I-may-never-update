from django.db import models
from django import forms
from django.core mail import send_mail

class ContactForm(forms.Form):
	subject = forms.CharField(max_lenth=100)
	message = forms.CharField()
	sender = forms.EmailField()
	cc_myself = forms.BooleanField(requred = False)
	
	
	def __unicode__(self):
		return self.subject
		


def sendmail():
	send_mail(self.subject,self.message,self.sender,[settings.ADMIN_EMAIL],fail_silently=True)
	