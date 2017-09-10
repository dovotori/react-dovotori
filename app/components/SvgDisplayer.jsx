import React, { Component } from 'react';

class SvgDisplayer extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    /* eslint-disable max-len */
    return (
      <svg
        style={{ display: 'none' }}
      >
        <symbol
          viewBox="0 0 7.9375001 7.4083332"
          height="28"
          width="30"
          id="logo"
        >
          <path fill="currentColor" d="M 3.175,2.2405001 2.6458333,1.7113334 3.7041667,0.6530001 2.6458333,-0.4053332 H 3.175 l 0.79375,0.79375 0.7937499,-0.79375 H 5.2916666 L 4.2333333,0.6530001 5.2916666,1.7113334 4.7624999,2.2405001 V 1.7113334 L 4.4979166,1.4467501 4.2333333,1.7113334 H 3.7041667 L 3.4395833,1.4467501 3.175,1.7113334 Z" />
          <path d="m 3.1750003,2.2405 0.264583,0.2645834 h 1.058334 L 4.7625003,2.2405 4.4979173,1.9759167 4.7625003,1.7113334 H 4.2333333 L 3.9687503,1.9759167 3.7041673,1.7113334 h -0.529167 l 0.264583,0.2645833 z" />
          <path d="M 2.9104166,0.91758341 H 1.5875 L 0,2.5050834 v 0.2645833 l 1.5875,1.5875 H 1.8520833 V 3.0342501 l 0.79375,-0.79375 V 1.1821667 Z" />
          <path d="M 5.0270833,0.9175834 H 6.35 l 1.5875,1.5875 V 2.7696667 L 6.35,4.3571667 H 6.0854167 V 3.0342501 l -0.79375,-0.79375 V 1.1821667 Z" />
          <path d="M 1.5875,4.62175 1.8520833,4.3571667 2.1166666,4.62175 H 5.8208333 L 6.0854166,4.3571667 6.3499999,4.62175 H 6.8791666 L 7.6729166,5.4155 6.3499999,6.7384167 6.0854166,6.4738333 V 6.20925 L 5.5562499,5.6800834 H 2.38125 L 1.8520833,6.20925 V 6.4738333 L 1.5875,6.7384167 0.2645833,5.4155 1.0583333,4.62175 Z" />
          <path d="M 6.35,6.7384163 6.085417,7.0030003 H 6.614583 Z" />
          <path d="M 1.5875,6.7384163 1.3229167,7.0030003 H 1.8520833 Z" />
        </symbol>

        <symbol width="38" height="38" version="1.1" viewBox="0 0 10 10.2" id="logo3">
          <path fill="currentColor" d="m4.1 0-0.4 0.4 0.86 0.86-1.8 1.8 0.93 0.86v-0.93l0.4-0.4 0.46 0.46h0.79l0.46-0.46 0.4 0.4v0.93l0.93-0.86-1.8-1.8 0.86-0.86-0.4-0.4-0.86 0.86z" />
          <path d="m3 2.3h-1.1l-1.9 1.9v0.37l1.8 1.9h0.46v-1.6l0.33-0.33v-1.8z" />
          <path d="m1.8 7.2-1.1 1.1 1.9 1.9 0.4-0.4v-0.26l0.79-0.79h2.4l0.79 0.79v0.26l0.4 0.4 1.9-1.9-1.1-1.1z" />
          <path d="m6.9 2.3h1.1l1.9 1.9v0.37l-1.8 1.9h-0.46v-1.6l-0.33-0.33v-1.8z" />
        </symbol>


        <symbol width="25" height="25" viewBox="0 0 7.4 6.6" id="logo2">
          <path fill="currentColor" d="m4.5 2.4 0.53-0.53-1.1-1.1 0.53-0.53l-0.26-0.26-0.53 0.53-0.53-0.53-0.26 0.26 0.53 0.53-1.1 1.1 0.53 0.53v-0.53l0.26-0.26 0.26 0.26h0.53l0.26-0.26 0.26 0.26z" />
          <path d="m5.6 2.6 0.26 0.26v1.1h0.26l1.3-1.3v-0.26l-1.3-1.3h-0.79l0.26 0.26z" />
          <path d="m2.1 1.1h-0.79l-1.3 1.3v0.26l1.3 1.3h0.26v-1.1l0.26-0.26v-1.3z" />
          <path d="m0.79 4.5h5.8l0.79 0.79-1.3 1.3-0.26-0.26v-0.26l-0.53-0.53h-3.2l-0.53 0.53v0.26l-0.26 0.26-1.3-1.3z" />
        </symbol>

        <symbol width="40" height="40" id="logo4" viewBox="0 0 40 40">
         <path d="m12 8h-4.8l-7.5 7.5v1.6l7.2 7.2h1.9v-5.9l1.3-1.3v-7.2z"/>
         <path d="m6.8 28-4 4 8 8 1.6-1.6v-1.1l3.2-3.2h8l3.2 3.2v1.1l1.6 1.6 8-8-4-4z"/>
         <path fill="currentColor" d="m16 0-1.6 1.6 3.5 3.5-7.2 7.2 3.7 3.7v-4l1.6-1.6 1.9 1.9h3.2l1.9-1.9 1.6 1.6v4l3.7-3.7-7.2-7.2 3.5-3.5-1.6-1.6-3.5 3.5z"/>
         <path d="m27 8h4.8l7.5 7.5v1.6l-7.2 7.2h-1.9v-5.9l-1.3-1.3v-7.2z"/>
        </symbol>

        <symbol width="68.5" height="25.5" viewBox="0 0 18.1 6.7" id="signature">
          <path d="m2.778.344v2.831l-2.778 1.852v.2646s-6.6e-7.2646.2646.2646h3.043v-5.556zm-4.7e-6 3.36v1.058s0 .2646-.2646.2646l-1.713-8.3e-6z" />
          <path d="m4.233 3.175c-.5292 0-.5292.5292-.5292.5292v1.323s-4e-7.5292.5292.5292h2.381v-.2646c0-.2646-.2646-.2646-.2646-.2646h-1.72l1.984-1.323v-.2646s2e-7-.2651-.2646-.2646zm1.588.5292-1.588 1.058v-.7938s0-.2646.2646-.2646c0 0 .8555-.0005215 1.323 0z" />
          <path d="m7.541 3.175s-.5292-3.3e-6-.5292.5292v.926h2.778v.1323s6e-7.2646-.2646.2646h-2.514v.2646s0 .2646.2646.2646h2.514s.5292 3.3e-6.5292-.5292v-.3969s0-.5292-.5292-.5292h-2.249v-.3969h.926s.5312-.002.5292-.5292z" />
          <path d="m11.24 5.556h-.5292v-1.852c0-.5292.5292-.5292.5292-.5292z" />
          <path d="m12.83 6.747c0-.5292.5292-.5292.5292-.5292h1.058v-.6615h-2.249s-.5292 0-.5292-.5292l3.5e-5-1.323c0-.5292.5291-.5292.5291-.5292l2.778-4.9e-6v3.043c0 .5292-.5292.5292-.5292.5292zm-.6615-1.72h2.249v-1.323h-1.984c-.2646 0-.2646.2646-.2646.2646z" />
          <path d="m18.12 5.556v-1.852c0-.5292-.5292-.5292-.5292-.5292h-2.249v2.381h.5292v-1.852h1.72v1.852z" />
          <path fill="currentColor" d="m6.615 3.44v2.117h-2.381c-.5292 0-.5292-.5292-.5292-.5292v-1.323s0-.5292.5292-.5292h2.117c.2646 0 .2646.2646.2646.2646zm-2.381.2646v1.323h1.588c.2646 0 .2646-.2646.2646-.2646v-1.058z" />
          <path fill="currentColor" d="m.2646 5.556c-.2646 0-.2646-.2646-.2646-.2646v-1.588s0-.5292.5292-.5292h1.455c0 .5292-.5292.5292-.5292.5292h-.6615c-.2646 0-.2646.2646-.2646.2646v.7938s3.4e-7.2646.2646.2646h2.249s.2646-6.7e-6.2646.2646l-1e-7.2646z" />
          <path fill="currentColor" d="m9.79.344v2.831l-2.778 1.852v.2646s4e-7.2646.2646.2646h3.043v-5.556zm0 3.36v1.058s6e-7.2646-.2646.2646h-1.72z" />
          <path fill="currentColor" d="m11.24 3.175s-.5292 0-.5292.5292l.0069 1.323s-.0069.5294.5223.5294h2.381v-.2646c0-.2646-.2646-.2646-.2646-.2646h-1.72l1.984-1.323v-.2646s0-.2646-.2646-.2646zm1.588.5292-1.588 1.058 3.5e-5-.7938s-3.5e-5-.2646.2645-.2646z" />
        </symbol>


      </svg>
    );
    /* eslint-enable max-len */
  }
}

SvgDisplayer.propTypes = {
};

SvgDisplayer.defaultProps = {
};

export default SvgDisplayer;
