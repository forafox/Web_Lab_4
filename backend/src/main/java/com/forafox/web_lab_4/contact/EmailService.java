package com.forafox.web_lab_4.contact;

import com.forafox.web_lab_4.DTO.email.EmailRequest;
import com.forafox.web_lab_4.DTO.email.EmailResponse;
import com.forafox.web_lab_4.models.user.User;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendContactMessage(EmailRequest request)
            throws MessagingException, UnsupportedEncodingException {

        String toAddress = "forafoxy@gmail.com";
        String fromAddress = "forafoxy@gmail.com";
        String senderName = "Automatic mailing service";
        String subject = "Message from the contact form";
        String content = "Message from the contact form <br>"
                + "Name:" + request.name() + "<br>"
                + "Telephone number:" + request.telephoneNumber() + "<br>"
                + "Email:" + request.email() + "<br>";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        helper.setText(content, true);

        mailSender.send(message);
    }

}
