import React from "react"
import CookieConsent, { Cookies, getCookieConsentValue } from "react-cookie-consent"; 

const PopUp = ( {onAccept, onDecline} ) => {
  return(
    <div>
      <CookieConsent
        sameSite="strict"
//        debug={true}
        expires={365}
        location="bottom"
        cookieName="radiogram"
        style={{ background: "#2B373B" ,fontSize: "24px" }}
        buttonText="Understood"
        buttonStyle={{ background: "whitesmoke" ,fontSize: "24px" }}
        onAccept={onAccept}
        enableDeclineButton
        declineButtonText="No way!"
        declineButtonStyle={{ background: "red" ,fontSize: "24px" }}
        onDecline={onDecline}
        setDeclineCookie={false}
        flipButtons
        hideOnAccept={true}
        
      >
        This website uses cookies to improve your listening experience. {" "}
        <a href="https://billsongames.weebly.com/privacy.html" target="blank" className='cookies__privacy-policy'>Privacy Policy</a>
</CookieConsent>
    </div>
  )
}

export default PopUp


