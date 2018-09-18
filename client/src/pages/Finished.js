import React from 'react';
import LabLogo from '../components/LabLogo';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  instructionText: {
    marginTop: 20,
    marginLeft: 60,
    marginRight: 60,
  },
};
export default class Finished extends React.Component {
  props: render = () => {
    return (
      <div style={styles.main}>
        <LabLogo size={66.667} />
        <div style={styles.instructionText}>
          You're finished now, congratulations! Please get the experimenter.
        </div>
      </div>
    );
  };
}
