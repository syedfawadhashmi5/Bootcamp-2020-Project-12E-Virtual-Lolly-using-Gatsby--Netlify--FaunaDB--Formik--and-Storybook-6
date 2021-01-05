import React, { useState } from "react";
import SvgLolly from "../components/SvgLolly";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Button, TextareaAutosize } from "@material-ui/core";
import * as Yup from "yup";
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag'
import { navigate } from 'gatsby';

import "./create.css";




const createLollyMutation = gql`
    mutation createLolly($recipient: String,$message: String,$sender:String,$top:String,$middle:String,$bottom:String){
        createLolly(recipient: $recipient,message: $message,sender:$sender,top:$top,middle:$middle,bottom:$bottom){
          recipient  
          message
          sender
          lollyPath
        }
    }
`

function create() {
  const [Top, setTop] = useState("#d52358");
  const [Middle, setMiddle] = useState("#e95946");
  const [Bottom, setBottom] = useState("#deaa43");

  const schema = Yup.object({
    recipient: Yup.string()
      .required("Recipiend is required")
      .min(3, "Must be minimum of 3 characters"),
    message: Yup.string()
      .required("Message is required")
      .min(10, "Must be minimum of 10 characters"),
    sender: Yup.string()
      .required("Sender is required")
      .min(3, "Must be minimum of 3 characters"),
  });



  const [createLolly] = useMutation(createLollyMutation);



  return (
    <div className="container">
      <div className="contain_header">
        <h1>virtual lollipop</h1>
        <p>
          because we all know someone
          <br />
          who deserves some sugar.
        </p>
      </div>
      <div className="main_lolly_div">
        <div>
          <SvgLolly Top={Top} Middle={Middle} Bottom={Bottom} />
        </div>
        <div className="lolly_color_picker">
          <label className="colorPickerLabel">
            <input
              type="color"
              value={Top}
              onChange={(e) => setTop(e.target.value)}
            />
          </label>
          <label className="colorPickerLabel">
            <input
              type="color"
              value={Middle}
              onChange={(e) => setMiddle(e.target.value)}
            />
          </label>
          <label className="colorPickerLabel">
            <input
              type="color"
              value={Bottom}
              onChange={(e) => setBottom(e.target.value)}
            />
          </label>
        </div>
        <div className="footer_div">
          <div className="from_div">
            <Formik
              initialValues={{ recipient: "", message: "", sender: "" }}
              validationSchema={schema}
              onSubmit={( value ) => {
                console.log("Recipient", Top);
                console.log("Message", Middle);
                console.log("Sender", Bottom);
                console.log("Top", value.recipient);
                console.log("Middle", value.message);
                console.log("Bottom", value.sender);

                createLolly({
                  variables: {
                      recipient: value.recipient,
                      message: value.message,
                      sender: value.sender,
                      top: Top,
                      middle: Middle,
                      bottom: Bottom,
                  }
              }).then(result => {
                // console.log(result)
                console.log("Result",result.data.createLolly.lollyPath);
                
                setTimeout(()=>navigate(`/lollies/${result.data.createLolly.lollyPath}`),5000)
                // navigate(`/lolies/${id}`)
            });
              }}
            >
              {(formik: any) => (
                <Form onSubmit={formik.handleSubmit}>
                  <div>
                    <label>To</label>
                    <Field
                      type="recipient"
                      as={TextField}
                      variant="outlined"
                      className="from_color"
                      label="Recipient"
                      name="recipient"
                      id="recipient"
                    />
                    <br />
                    <ErrorMessage
                      name="recipient"
                      render={(msg: string) => (
                        <span style={{ color: "white", fontSize: "18sp" }}>
                          {msg}
                        </span>
                      )}
                    />
                    <br />
                  </div>
                  <div>
                    <label>Say something nice</label>
                    <Field
                      type="message"
                      as={TextareaAutosize}
                      label="Message"
                      name="message"
                      id="message"
                    />
                    <br />
                    <ErrorMessage
                      name="message"
                      render={(msg: string) => (
                        <span style={{ color: "white", fontSize: "18sp" }}>
                          {msg}
                        </span>
                      )}
                    />
                    <br />
                  </div>
                  <div className="checking">
                    <label>From</label>
                    <Field
                      type="sender"
                      as={TextField}
                      variant="outlined"
                      className="from_color"
                      label="Sender"
                      name="sender"
                      id="sender"
                    />
                    <br />
                    <ErrorMessage
                      name="sender"
                      render={(msg: string) => (
                        <span style={{ color: "white", fontSize: "18sp" }}>
                          {msg}
                        </span>
                      )}
                    />
                    <br />
                  </div>
                  <div className="footer">
                    <input
                      type="submit"
                      value="Freeze this lolly and get a link"
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default create;
