import emailjs from 'emailjs-com';
import React, { useState, useEffect } from 'react';
import './contact.css';
import Navbar from '../common/navbar';
export default function AppContact2() {
    var Type = localStorage.getItem('Role')

    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm('service_vlu3r5b', 'template_bn3ci7r', e.target, 'user_Ro2hT72fMznnf6LHvIyCr').then(
            (result) => {
                console.log(result.text);
            },
            (error) => {
                console.log(error.text);
            }
        );
        e.target.reset();
      }

      return (
          <div>
              
              <div id="contact" className="Contact">
                  <br />
                  <h2>التواصل</h2>
  
                  <div className="right-container">
                      <p>
                          {' '}
                          بإمكانكم التواصل معنا وإرسال ملاحظاتكم لنا من خلال رقم الهاتف التالي أو عن طريق البريد
                          الإلكتروني
                      </p>
                      <a href="tel:022225753">
                          022225753<i className="fa fa-phone fa-3x" />
                      </a>
                  </div>
  
                  <div className="left-container">
                      <form onSubmit={sendEmail}>
                          <div className="row pt-5 mx-auto">
                              <div className="col-8 form-group mx-auto">
                                  <input type="text" className="form-control" placeholder="الاسم" name="name" required />
                              </div>
                              <div className="col-8 form-group pt-2 mx-auto">
                                  <input
                                      type="email"
                                      className="form-control"
                                      placeholder="البريد الالكتروني"
                                      name="email"
                                      required
                                  />
                              </div>
                              <div className="col-8 form-group pt-2 mx-auto">
                                  <input
                                      type="text"
                                      className="form-control"
                                      placeholder="موضوع الرسالة"
                                      name="subject"
                                      required
                                  />
                              </div>
                              <div className="col-8 form-group pt-2 mx-auto">
                                <textarea
                                    className="form-control"
                                    id=""
                                    cols="30"
                                    rows="8"
                                    placeholder="الرسالة"
                                    name="message"
                                    required
                                />
                            </div>
                            <div className="col-8 pt-3 mx-auto">
                                <input type="submit" className="Send-message-btn" value="إرسال" required />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
  