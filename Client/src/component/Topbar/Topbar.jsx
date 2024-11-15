import React from 'react'
import $ from "jquery"
import "./Topbar.scss"
import kannada from "../../assets/kannada.jpeg"
import hindi from "../../assets/hindi.jpeg"
import english from "../../assets/english.jpeg"


const Topbar = () => {
    function googleTranslateElementInit() {

        new window.google.translate.TranslateElement({
            pageLanguage: 'en',
            autoDisplay: false
        }, 'google_translate_element')


    }


    function translateLanguage(lang) {

        var frame = $('.goog-te-menu-frame:first');


        frame.contents().find('.goog-te-menu2-item span.text:contains(' + lang + ')').get(0).click();
        return false;
    }

    return (
        <div className='topbar'>
            <div id="google_translate_element" style={{ display: "none" }}></div>
            <script type="text/javascript">
                {
                    function googleTranslateElementInit() {
                        new window.google.translate.TranslateElement({
                            pageLanguage: 'de', includedLanguages: 'en,it,fr,ru,tr'
                        }, 'google_translate_element');
                    }}
            </script>
            <script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>


            <div class="dropdown">
                <button class="btn btn-register dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class='bx bx-world'></i> Language
                </button>
                <ul class="dropdown-menu">
                    <li><img src={kannada} alt="" /><a class="dropdown-item" href="javascript:void(0)" onClick={() => translateLanguage('Kannada')}> <span class="align-middle">Kannada</span></a></li>
                    <li><img src={english} alt="" /><a class="dropdown-item" href="javascript:void(0)" onClick={() => translateLanguage('English')}><span class="align-middle">English</span></a></li>
                    <li><img src={hindi} alt="" /><a class="dropdown-item" href="javascript:void(0)" onClick={() => translateLanguage('Hindi')}><span class="align-middle">Hindi</span></a></li>
                </ul>
            </div>

        </div>
    )
}

export default Topbar