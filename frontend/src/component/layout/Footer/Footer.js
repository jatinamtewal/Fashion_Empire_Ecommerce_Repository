import React from "react";
// import playStore from "../../../images/playstore.png";
// import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        {/* <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" /> */}
        <div className="col">
                <p>Ouick links</p>
                <ul>
                    <li>Category</li>
                    <li>Promo</li>
                    <li>Men Product</li>
                    <li>Women Product</li>
                </ul>
      </div>

      </div> 
      
      <div className="midFooter">
        {/* <h1>FASHION EMPIRE</h1> */}
        <img className="logoimg" src="data:image/jpeg;base64,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+1Cff2U8/X8z/eRU50XxDtLpLyoFdRbctuwdykkKUx3JK4A75Imp0l4k0r1bp61E24t081jv3Dbkj4DB47SBeEdotyXtz2NZLirxyUpKdgz6fm1EYf3DN3rXpKno+n1loO9Q3FelTdnxlUTc4X2f5hzKdEm0fxRW4qUwbKrTtalZbZa5OVDt7qtgYB7dicZlkysul9AqXNlpCAU0tKbJeuQ5Z6lQZYLjaAo3Mc8ntiWBZXfmmpgewtQ01Ofe2gbj9myP8JiVLG9ERNIREQEREBERAREQEREBKz8W+l7i6Ftd2iF69FsFV94rkMCPjhh2/mMsyfJKIP1903W1WxpLTG24UpWVH4ydpVkY+hwx+4E43UXSl1fWH5lHZcULenTo0tysd6YNRgVO32goC/Ic4zgWlEml2rTo+4ehZULq7tq9NLWg1FKflMajszYZwg5A2hQCcd3zxgnU6d0e61S9TVbykbe3pHNvRK7WJzwzDGe/OfUgY4HNq4nyJDarNc6Lvf2r+Kt1DWtd6LVzuUFQlRKjDBIyCaS9s+8eJz+hmFXXtSY84FZfsKip/tLkkL0jogWuo1tQpVvYqq+6kU53MwYkNntuGe3rFhtHtC6AvbW4u6CMn7OuGXcwYip5asW8sL6EhipPwyRg4xq9NdHapp1e+o0aSNRuKZppcGooFMbjtZl95iFY+yByQOQOZcES6Nq+646Ja4sba2tMeZbbTTDEDcFXaQSfU8Hn1E5eu9CXFTSKduvtXq1TeOMj26j7t657Zw5x/dEtWJNG3F6RpullZpUQpUW3p02VhghlQKQR9RI14raBWvbeiaSlxSrCpURfeZMFWKD1YA9vmcc8SfRKbVRrfW1a7/s/RKNRmx5bVijIKagYwAwGzj1bGPQEzUoeGtaxewu6ebmrTrh7hVI5BIw1MN3289+TnPylvrTUZwAM98CZI0bVl1n0jcV9Ss72ipaifLp18Yyqq+SSD3BU4OJh608Pbi91CndJUUW7hEq+0Q6oBtYDHcFSR39ZacRo2ru56UrUtYttQoUwbdqZp1MEAoVplFOCeRgIOJHPClWp3esFaZqVEbYFDKCfzHyAWOB7o7n0lzyselLQ2et6lQYELcJ+Jpn0YbtzY+jO36SWaJXroro66F7X1W/VUquzlKQYMV38ZLDjheBj4mYNM6Evra8uxRdBY3PDtuIqKhfcVVQPewWUHPAbPcYlpxGjas/Drpqvp17qCPSIoOFajVGNhUOxC5zkHDjg/wAJ+Um3UWi0r6hUtq2djjuO6sOQw+YM60S6Nq66b6X1iyQ2SXlD8JuJWoabGuoY+0Kan2QcnILbgCex7Sd2VqlFFpJnaowMnJPxJJ5JJ7n5zanyDb7ERKhERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQExNRUkMVBYZwSBkZ74PpMsQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERA//9k=" alt="Fashion Empire"/>
      
        <p>Create Your Own Fashion</p>

        <p>Copyrights 2022 &copy; FASHION EMPIRE</p>
      </div>

      <div className="rightFooter">
      <h4>Follow Us</h4>
      <a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a>
      <a href="https://www.youtube.com" target="_blank" rel="noreferrer">Youtube</a>
      <a href="https://www.facebook.com" target="_blank" rel="noreferrer">Facebook</a>
      </div>


      {/* down */}

{/* <div className="footersec">
            <div className="col">
                <p>Ouick links</p>
                <ul>
                    <li>Category</li>
                    <li>Promo</li>
                    <li>Men Product</li>
                    <li>Women Product</li>
                </ul>
            </div>
            <div className="col">
                <p>Services</p>
                <ul>
                    <li>Men Product</li>
                    <li>Women Product</li>
                    <li>Accesories</li>
                    <li>Promo</li>
                </ul>
            </div>
            <div className="col">
                <p>Social Media</p>
                <ul>
                    <li>Facebook</li>
                    <li>Instagram</li>
                    <li>Twitter</li>
                    <li>Youtube</li>
                </ul>
            </div>
            <div className="col">
                <p>About</p>
                <ul>
                    <li>Company</li>
                    <li>Careers</li>
                    <li>Legal</li>
                    <li>Help</li>
                </ul>
            </div>
        </div>
        <div className="footerlogo">
            <img className="logoimg" src="data:image/jpeg;base64,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+1Cff2U8/X8z/eRU50XxDtLpLyoFdRbctuwdykkKUx3JK4A75Imp0l4k0r1bp61E24t081jv3Dbkj4DB47SBeEdotyXtz2NZLirxyUpKdgz6fm1EYf3DN3rXpKno+n1loO9Q3FelTdnxlUTc4X2f5hzKdEm0fxRW4qUwbKrTtalZbZa5OVDt7qtgYB7dicZlkysul9AqXNlpCAU0tKbJeuQ5Z6lQZYLjaAo3Mc8ntiWBZXfmmpgewtQ01Ofe2gbj9myP8JiVLG9ERNIREQEREBERAREQEREBKz8W+l7i6Ftd2iF69FsFV94rkMCPjhh2/mMsyfJKIP1903W1WxpLTG24UpWVH4ydpVkY+hwx+4E43UXSl1fWH5lHZcULenTo0tysd6YNRgVO32goC/Ic4zgWlEml2rTo+4ehZULq7tq9NLWg1FKflMajszYZwg5A2hQCcd3zxgnU6d0e61S9TVbykbe3pHNvRK7WJzwzDGe/OfUgY4HNq4nyJDarNc6Lvf2r+Kt1DWtd6LVzuUFQlRKjDBIyCaS9s+8eJz+hmFXXtSY84FZfsKip/tLkkL0jogWuo1tQpVvYqq+6kU53MwYkNntuGe3rFhtHtC6AvbW4u6CMn7OuGXcwYip5asW8sL6EhipPwyRg4xq9NdHapp1e+o0aSNRuKZppcGooFMbjtZl95iFY+yByQOQOZcES6Nq+646Ja4sba2tMeZbbTTDEDcFXaQSfU8Hn1E5eu9CXFTSKduvtXq1TeOMj26j7t657Zw5x/dEtWJNG3F6RpullZpUQpUW3p02VhghlQKQR9RI14raBWvbeiaSlxSrCpURfeZMFWKD1YA9vmcc8SfRKbVRrfW1a7/s/RKNRmx5bVijIKagYwAwGzj1bGPQEzUoeGtaxewu6ebmrTrh7hVI5BIw1MN3289+TnPylvrTUZwAM98CZI0bVl1n0jcV9Ss72ipaifLp18Yyqq+SSD3BU4OJh608Pbi91CndJUUW7hEq+0Q6oBtYDHcFSR39ZacRo2ru56UrUtYttQoUwbdqZp1MEAoVplFOCeRgIOJHPClWp3esFaZqVEbYFDKCfzHyAWOB7o7n0lzyselLQ2et6lQYELcJ+Jpn0YbtzY+jO36SWaJXroro66F7X1W/VUquzlKQYMV38ZLDjheBj4mYNM6Evra8uxRdBY3PDtuIqKhfcVVQPewWUHPAbPcYlpxGjas/Drpqvp17qCPSIoOFajVGNhUOxC5zkHDjg/wAJ+Um3UWi0r6hUtq2djjuO6sOQw+YM60S6Nq66b6X1iyQ2SXlD8JuJWoabGuoY+0Kan2QcnILbgCex7Sd2VqlFFpJnaowMnJPxJJ5JJ7n5zanyDb7ERKhERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQExNRUkMVBYZwSBkZ74PpMsQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERA//9k=" alt="Fashion Empire"/>
            <p>@Copyright 2022-FASHION EMPIRE</p>
        </div> */}
    </footer>
  );
};

export default Footer;
