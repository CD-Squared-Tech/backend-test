from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from .serializers import *
from django.core.mail import send_mail

@api_view(['POST'])
@permission_classes([AllowAny])
def contact(request):
    if request.method == 'POST':
        serializer = ContactSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            fname = serializer.validated_data['fname']
            lname = serializer.validated_data['lname']
            email = serializer.validated_data['email']
            message = serializer.validated_data['message']

            subject = 'New Contact Form Submission'
            message_body = f'Name: {fname} {lname}\nEmail: {email}\nMessage: {message}'
            from_email = None
            recipient_list = ['bmitchum.dev@gmail.com']

            send_mail(subject, message_body, from_email, recipient_list, fail_silently=False)
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

# def contact(request):
#     form_submitted = False
#     CAPTCHA_SITE_KEY = config('CAPTCHA_SITE_KEY', default='')
#     if request.method == 'POST':
#         form = ContactForm(request.POST)
#         if form.is_valid():
#             form.save()
#             form_submitted = True
#             fname = form.cleaned_data['fname']
#             lname = form.cleaned_data['lname']
#             email = form.cleaned_data['email']
#             message = form.cleaned_data['message']

#             subject = 'New Contact Form Submission'
#             message_body = f'Name: {fname} {lname}\nEmail: {email}\nMessage: {message}'
#             from_email = None
#             recipient_list = ['bmitchum.dev@gmail.com']

#             send_mail(subject, message_body, from_email, recipient_list, fail_silently=False)
#         else:
#             if 'email' in form.errors:
#                 form.errors['email'] = 'Please enter a valid email address.'
#             if 'message' in form.errors:
#                 form.errors['message'] = 'Please enter a message.'
#             if 'fname' in form.errors:
#                 form.errors['fname'] = 'Please enter your first name.'
#             if 'lname' in form.errors:
#                 form.errors['lname'] = 'Please enter your last name.'
#     else: 
#         form = ContactForm()
#     return render(request, 'home.html', {'form': form, 'form_submitted': form_submitted, 'CAPTCHA_SITE_KEY': CAPTCHA_SITE_KEY})


