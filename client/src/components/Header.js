import React from 'react';
import { Row } from 'reactstrap';
import LabLogo from '../images/LabLogo';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'lavender',
    padding: 10,
    margin: 10,
  },
};

export default class Header extends React.Component {
  render = () => {
    return (
      <Row style={styles.header}>
        <LabLogo size={50} />
      </Row>
    );
  };
}
