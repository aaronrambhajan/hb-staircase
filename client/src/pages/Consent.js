import React from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import Header from '../components/Header';

const styles = {
  // div.consent
  main: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 0,
  },
  // .consent div#header
  consentdivHeaderClass: {
    margin: 'auto',
    width: '100%',
    lineHeight: '1.4em',
    float: 'left',
  },
  // .consent img#icon
  consentimgIconClass: {
    height: '3.9em',
    float: 'left',
    textAlign: 'left',
  },
  // .consent div#header p
  consentdivHeaderpClass: {
    textAlign: 'center',
  },
  // .consent div#revise
  consentdivReviseClass: {
    float: 'right',
    fontSize: '16px',
    fontFamily: 'Helvetica',
  },
  // .consent p
  consentpClass: {
    fontSize: '20px',
    fontFamily: 'Helvetica',
    textAlign: 'left',
    lineHeight: '1.4em',
  },
  // .consent h1
  consenth1Class: {
    textAlign: 'center',
    fontFamily: 'Helvetica',
    fontSize: '20px',
    textDecoration: 'underline',
    fontWeight: 'bold',
    lineHeight: '1.4em',
  },
  // .consent h2
  consenth2Class: {
    fontSize: '20px',
    fontFamily: 'Helvetica',
    lineHeight: '1.4em',
    textAlign: 'left',
  },
  // .consent ol
  consentolClass: {
    fontSize: '20px',
    fontFamily: 'Helvetica',
    lineHeight: '1.4em',
    textAlign: 'left',
  },
};

export default class Consent extends React.Component {
  props: {
    onConfirmation: Function,
  };

  render = () => {
    return (
      <Container>
        <Header />

        <div style={styles.main}>
          <div style={styles.consentdivHeaderClass}>
            <p style={styles.consentpClass}>
              <b>Department of Psychology</b>
              <br />
              University of Toronto
              <br />
              100 St. George Street
              <br />
              Toronto, Ontario, Canada, M5S 3G3
            </p>
          </div>
          <h1 style={styles.consenth1Class}>
            LETTER OF INFORMATION &amp; PARTICIPANT CONSENT
          </h1>
          <p style={styles.consentpClass}>
            We are pleased to invite you to participate in the research study
            outlined below. Please read through the information below to
            determine whether or not you would like to participate. Your
            participation is entirely voluntary and you can withdraw at any time
            without penalty.
          </p>
          <p style={styles.consentpClass}>
            Inclusion criteria for participating includes: 18-70 years old
            (University of Toronto PSY 100 subject pool students may be under 18
            years old), fluent in English, normal or corrected-to-normal vision,
            normal color vision, normal hearing, and no history of neurological
            or psychiatric disorders.
          </p>
          <p style={styles.consentpClass}>
            <b>Study Title:</b> The behavioural dynamics of attention and memory
            during successful learning
          </p>
          <p style={styles.consentpClass}>
            <b>Investigator:</b> Dr. Michael Mack, email:{' '}
            <u>mack@psych.utoronto.ca</u>
          </p>
          <h2 style={styles.consenth2Class}>Purpose of Research:</h2>
          <p style={styles.consentpClass}>
            The purpose of this study is to examine how cognitive processes,
            such as perception, learning, memory, and decision making interact
            with each other.
          </p>
          <h2 style={styles.consenth2Class}>Experiment Procedures:</h2>
          <ol style={styles.consentolClass}>
            <li>
              Prior to beginning the experimental session, you will be asked to
              complete a background questionnaire that includes questions about
              your education, health, and demographics.
            </li>
            <li>
              The computerized experiment will involve observing images of
              objects, faces, or scenes, or listening to sounds and making
              judgments about them with key presses or mouse clicks.
            </li>
            <li>
              At the end of the session, you will be fully debriefed as to the
              rationale and hypothesis underlying this experiment.
            </li>
          </ol>
          <h2 style={styles.consenth2Class}>Time Commitment:</h2>
          <p style={styles.consentpClass}>
            If you choose to participate, you will be asked to complete a
            testing session that could last for approximately 10-60 minutes.
            There will be opportunities to rest during the experiment.
          </p>
          <h2 style={styles.consenth2Class}>Compensation:</h2>
          <p style={styles.consentpClass}>
            You will not receive any compensation for participating in this
            study. However, you may choose to enter your email address at the
            end of the experiment for the chance to win a $25 gift card–your
            chance of winning will be approximately 1 in 100.
          </p>
          <h2 style={styles.consenth2Class}>Voluntariness/Early Withdrawal:</h2>
          <p style={styles.consentpClass}>
            This study is entirely voluntary. You are free to leave the
            experiment at any time, and this will have no bearing on the
            compensation that you may receive, nor will it have any other
            undesirable consequences.
          </p>
          <h2 style={styles.consenth2Class}>Risks/Benefits:</h2>
          <p style={styles.consentpClass}>
            There are no known physical or psychological risks associated with
            your participation in this study. There are no direct benefits to
            you for participating in this research study other than the
            opportunity to learn about the scientific method and its direct
            application in addressing specific research questions.
          </p>
          <h2 style={styles.consenth2Class}>Results/Confidentiality:</h2>
          <p style={styles.consentpClass}>
            Data on your performance will be used exclusively for scientific
            purposes and will be recorded and maintained in confidence and in
            anonymity by, and available only to Dr. Mack and researchers working
            under his supervision. No identifying information will be stored
            with your experimental data. You will be assigned a participant code
            from the online system and all data collection and analysis will be
            conducted with this participant code and the date/time of the
            session. This data is kept in a secure location with restricted
            access.{' '}
            <b>
              The University of Toronto research ethics program may have
              confidential access to this data to help ensure participant
              protection procedures are followed.
            </b>
          </p>
          <h2 style={styles.consenth2Class}>Dissemination of Results:</h2>
          <p style={styles.consentpClass}>
            The results of this research will be published in scientific
            journals or presented at scientific conferences and seminars. Your
            name or other identifying information will not be included in these
            presentations. Following the publication of results, digital files
            containing your data may be made available for other researchers to
            analyze. Before this data is made available, all names and other
            identifiable information will be removed.
          </p>
          <h2 style={styles.consenth2Class}>General Information:</h2>
          <p style={styles.consentpClass}>
            If you have any questions about the research, please feel free to
            contact us by email at <u>macklabuoft@gmail.com</u>.
          </p>
          <p style={styles.consentpClass}>
            If you have questions about your rights as a participant, you can
            contact the Office of Research Ethics at the University of Toronto
            at 416-946-3273 or email at <u>ethics.review@utoronto.ca</u>.
          </p>
          <h2 style={styles.consenth2Class}>Participant Consent:</h2>
          <p style={styles.consentpClass}>
            I have read and understood the information above regarding the
            procedures and risks involved in this study and have received
            satisfactory answers to my questions related to this study.
          </p>
          <p style={styles.consentpClass}>
            I understand that if I have any questions or concerns resulting from
            my participation in this study, I may contact the laboratory members
            by email at
            <u>macklabuoft@gmail.com</u> or Dr. Mack at{' '}
            <u>mack@psych.utoronto.ca</u>.
          </p>
          <p style={styles.consentpClass}>
            I am aware that I may withdraw from the study at any time without
            penalty. With full knowledge of all foregoing I agree, of my own
            free will, to participate in this study.
          </p>
          <p style={styles.consentpClass}>
            If you agree to the above statement and would like to continue with
            this study, please click “I agree”. If you would not like to
            continue, please click “I disagree”.
          </p>
          <div style={styles.consentdivReviseClass}>
            Revised: December 9, 2016
          </div>
          <div onClick={this.props.onConfirmation}>
            <Button size="lg" color="primary">
              I agree
            </Button>
          </div>
        </div>
      </Container>
    );
  };
}
