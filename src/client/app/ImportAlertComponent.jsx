import React from 'react';

class ImportAlertComponent extends React.Component {

  constructor(props) {
    super(props);

  }

  onClose(e) {
    this.props.onClose && this.props.onClose(e)
  }


  render() {
    if(!this.props.show) {
      return null;
    }

    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      padding: 50
    };

    const alertStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      minWidth: 300,
      width: 470,
      maxWidth: 500,
      minHeight: 100,
      margin: '0 auto',
      padding: '15px 15px 40px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      border: '1px solid #000'
    };

    const footerStyle = {
      position: 'absolute',
      bottom: 10,
      right: 20
    };

    const messageStyle = {
      whiteSpace: 'pre-wrap'
    }

    return (

          <div className="dragon-backdrop" style={backdropStyle}>
            <div className="dragon-alert" style={alertStyle}>
              <p style={messageStyle}>
                {this.props.alertMessage}
              </p>
              <div style={footerStyle}>
                <button onClick={(e) => {this.onClose(e)}}>
                  Close
                </button>
              </div>
            </div>
          </div>

    );
  }


}

export default ImportAlertComponent;
