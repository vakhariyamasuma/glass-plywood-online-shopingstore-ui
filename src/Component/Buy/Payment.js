import React, { useEffect, useState } from 'react'
import { Button, message } from 'antd';
import OrderService from '../../Services/OrderService';
import { useNavigate } from "react-router-dom";
import CartService from '../../Services/CartService';

export default function Payment(props) {
    const navigate = useNavigate();
    const [cardNumber, setCardNumber] = useState("")
    const [cardName, setCardName] = useState("")
    const [cvv, setCvv] = useState("")
    const [messageApi, contextHolder] = message.useMessage();

    const handleCreateOrder = () => {
        let buyingProductData = JSON.parse(localStorage.getItem("buyingProductData"))
        let shippingDetails = JSON.parse(localStorage.getItem("shippingDetails"))
        let user = JSON.parse(localStorage.getItem("user"))
        let orderData = {
            products: buyingProductData?.products,
            total: buyingProductData?.totalPrice,
            name: shippingDetails.name,
            userId: user.userId,
            address: shippingDetails.address,
            mobile_number: shippingDetails.mobile_number,
            email: shippingDetails.email
        }
        OrderService.createOrder(orderData).then((response) => {
            if (response.status === 200) {
                if (buyingProductData.cartProduct) {
                    let productIds = [];
                    buyingProductData.products.map((product) => {
                        productIds.push(product._id)
                    })
                    CartService.removeAllFromCart(productIds).then((response) => {
                        if (response.status === 200) {
                            alertMessage();
                        }
                    }).catch((error) => {
                    })
                } else {
                    alertMessage();
                }
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const alertMessage = () => {
        messageApi.open({
            type: 'success',
            content: 'Product Order Created Successfully',
        });
        setTimeout(() => {
            navigate("/")
        }, 2000)
    }

    useEffect(() => {
        (function payment() {
            var d = document,
                body = d.getElementsByTagName('body')[0],
                ccForm = d.getElementsByTagName('form')[1],
                cCard = d.querySelector('#cc-card'),
                pCard = d.querySelector('#pp-card'),
                eCard = d.querySelector('#ec-card'),
                info = d.querySelector('#choosen-paymenttype'),
                ccNumber = ccForm.querySelector('#cardnumber'),
                cNumber = d.querySelectorAll('.card-number'),
                ccName = ccForm.querySelector('#cardholder'),
                cName = d.querySelectorAll('.card-holder'),
                ccMonth = ccForm.querySelector('#expires-month'),
                cMonth = d.querySelectorAll('.e-month'),
                ccYear = ccForm.querySelector('#expires-year'),
                cYear = d.querySelectorAll('.e-year'),
                ccCCV = ccForm.querySelector('#ccv'),
                cCCV = d.querySelector('.ccv strong'),
                ccCard = d.querySelectorAll('.credit-card-type'),
                defaultNumber = cNumber[0].getElementsByTagName('span')[0].innerHTML,
                defaultName = cName[0].getElementsByTagName('span')[0].innerHTML;


            init();

            function init() {
                var cardType, cardNumber, cardName, cardCCV;
                body.className = 'cc-bg';

                function switchPos(elm) {
                    if (elm.classList.contains('selected')) {
                        if (elm.getElementsByTagName('input').length) {
                            elm.getElementsByTagName('input')[0].focus();
                        }
                        return;
                    }
                    var selected = d.querySelector('.selected');

                    if (elm.classList.contains('unselected-left')) {
                        selected.classList.remove('selected');
                        selected.classList.add('unselected-left');
                        elm.classList.add('selected');
                        elm.classList.remove('unselected-left');
                        if (window.matchMedia("(max-width: 1039px)").matches) {
                            setTimeout(function () { elm.scrollIntoView(); }, 500);
                        }

                    } else if (elm.classList.contains('unselected-right')) {
                        selected.classList.remove('selected');
                        selected.classList.add('unselected-right');
                        elm.classList.add('selected');
                        elm.classList.remove('unselected-right');
                        if (window.matchMedia("(max-width: 1039px)").matches) {
                            setTimeout(function () { elm.scrollIntoView(); }, 500);
                        }
                    }
                }

                addEvent(pCard, 'click', function () {
                    switchPos(d.querySelector('.paymenttype.pp'));
                    body.className = 'pp-bg';
                    info.innerHTML = 'PayPal';
                });
                addEvent(cCard, 'click', function () {
                    switchPos(d.querySelector('.paymenttype.cc'));
                    body.className = 'cc-bg';
                    info.innerHTML = 'Credit Card';
                });
                addEvent(eCard, 'click', function () {
                    switchPos(d.querySelector('.paymenttype.ec'));
                    body.className = 'ec-bg';
                    info.innerHTML = 'Bank account';
                });

                addEvent(ccNumber, 'focus', function () {
                    cNumber[0].classList.add('glow');
                });
                addEvent(ccNumber, 'blur', function () {
                    cNumber[0].classList.remove('glow');
                });

                addEvent(ccName, 'focus', function () {
                    cName[0].classList.add('glow');
                });
                addEvent(ccName, 'blur', function () {
                    cName[0].classList.remove('glow');
                });

                addEvent(ccMonth, 'focus', function () {
                    cMonth[0].classList.add('glow');
                });
                addEvent(ccMonth, 'blur', function () {
                    cMonth[0].classList.remove('glow');
                });

                addEvent(ccYear, 'focus', function () {
                    cYear[0].classList.add('glow');
                });
                addEvent(ccYear, 'blur', function () {
                    cYear[0].classList.remove('glow');
                });

                addEvent(ccCCV, 'focus', function () {
                    cCard.classList.add('flipped');
                });
                addEvent(ccCCV, 'blur', function () {
                    cCard.classList.remove('flipped');
                });


                addEvent(ccNumber, 'keyup', function (e) {
                    let parts = "";
                    // console.log(e.target.value)

                    cardNumber = this.value.replace(/[^0-9\s]/g, '');
                    console.log(cardNumber)

                    if (!!this.value.match(/[^0-9\s]/g)) {
                        this.value = cardNumber;
                    }
                    cardType = getCardType(cardNumber.replace(/\s/g, ''));
                    switch (cardType) {
                        case 'amex':
                            parts = numSplit(cardNumber.replace(/\s/g, ''), [4, 6, 5]);
                            ccCard[0].className = 'credit-card-type amex';
                            break;
                        case 'mastercard':
                            parts = numSplit(cardNumber.replace(/\s/g, ''), [4, 4, 4, 4]);
                            ccCard[0].className = 'credit-card-type mastercard';
                            break;
                        case 'visa':
                            parts = numSplit(cardNumber.replace(/\s/g, ''), [4, 4, 4, 4]);
                            ccCard[0].className = 'credit-card-type visa';
                            break;
                        default:
                            parts = cardNumber.split(' ');
                            ccCard[0].className = 'credit-card-type';
                    }
                    cardNumber = parts.join(' ');

                    if (cardNumber != this.value) {
                        this.value = cardNumber;
                    }
                    if (!cardNumber) {
                        cardNumber = defaultNumber;
                    }
                    syncText(cNumber, cardNumber);
                });
                addEvent(ccName, 'keyup', function () {
                    cardName = this.value.replace(/[^a-zA-Z-\.\s]/g, '');
                    if (cardName != this.value) {
                        this.value = cardName;
                    }
                    if (!cardName) {
                        cardName = defaultName;
                    }
                    syncText(cName, cardName);
                });
                addEvent(ccMonth, 'keyup', function (ev) {
                    ev = ev || window.event;
                    var month = this.value.replace(/[^0-9]/g, '');
                    if (ev.keyCode == 38) {
                        if (!month) { month = 0; }
                        month = parseInt(month);
                        month++;
                        if (month < 10) {
                            month = '0' + month;
                        }
                    }
                    if (ev.keyCode == 40) {
                        if (!month) { month = 13; }
                        month = parseInt(month);
                        month--;
                        if (month == 0) { month = 1; }
                        if (month < 10) {
                            month = '0' + month;
                        }

                    }
                    if (parseInt(month) > 12) {
                        month = 12;
                    }
                    if (parseInt(month) < 1 && month != 0) {
                        month = '01';
                    }
                    if (month == '00') {
                        month = '01';
                    }

                    if (month != this.value) {
                        this.value = month;
                    }
                    if (month.toString().length == 2) {
                        syncText(cMonth, month);
                    }
                });
                addEvent(ccYear, 'keyup', function (ev) {
                    ev = ev || window.event;
                    var currentYear = new Date().getFullYear().toString().substr(2, 2),
                        year = this.value.replace(/[^0-9]/g, '');

                    if (ev.keyCode == 38) {
                        if (!year) { year = currentYear; }
                        year = parseInt(year);
                        year++;
                        if (year < 10) {
                            year = '0' + year;
                        }
                    }
                    if (ev.keyCode == 40) {
                        if (!year) { year = parseInt(currentYear) + 5; }
                        year = parseInt(year);
                        year--;
                        if (year < 10) {
                            year = '0' + year;
                        }
                    }

                    if (year.toString().length == 2 && parseInt(year) < currentYear) {
                        year = currentYear;
                    }
                    if (year != this.value) {
                        this.value = year;
                    }
                    if (year > (parseInt(currentYear) + 5)) {
                        year = (parseInt(currentYear) + 5);
                        this.value = year;
                    }


                    if (year.toString().length == 2) {
                        syncText(cYear, year);
                    }
                });
                addEvent(ccCCV, 'keyup', function () {
                    cardCCV = this.value.replace(/[^0-9\s]/g, '');
                    if (cardCCV != this.value) {
                        this.value = cardCCV;
                    }
                    cCCV.innerHTML = cardCCV;
                });
            }

            function syncText(elCol, text) {
                var collection;
                for (var j = 0; j < elCol.length; j++) {
                    collection = elCol[j].querySelectorAll('span');
                    if (!collection.length) {
                        elCol[j].innerHTML = text;
                    } else {
                        for (var i = 0; i < collection.length; i++) {
                            collection[i].innerHTML = text;
                        }
                    }
                }
            }

            function numSplit(number, indexes) {
                var tempArr = number.split(''),
                    parts = [];
                for (var i = 0, l = indexes.length; i < l; i++) {
                    if (tempArr.length) {
                        parts.push(tempArr.splice(0, indexes[i]).join(''));
                    }
                }
                return parts;
            }

            function getCardType(number) {
                var re;
                // Mastercard
                re = new RegExp("^5[1-5]");
                if (number.match(re) != null) {
                    return "mastercard";
                }
                // AMEX
                re = new RegExp("^3[47]");
                if (number.match(re) != null) {
                    return "amex";
                }

                // visa
                var re = new RegExp("^4");
                if (number.match(re) != null) {
                    return "visa";
                }

                return "";
            }

            function addEvent(elem, event, func) {
                elem.addEventListener(event, func);
            }
        })();
    }, [])





    return (
        <div className="body" style={{ background: "linear-gradient(45deg, #cb60b3 0%, #71117d 50%, #39296b 100%) !important" }}>
            {contextHolder}
            <h1>Choose Payment</h1>
            <p id="choosen-paymenttype">Credit Card</p>
            <ul class="payment-types">
                <li class="paymenttype pp unselected-left">
                    <div class="box">
                        <header>
                            <div class="card" id="pp-card">
                                <div class="flipper">
                                    <div class="front">
                                        <div class="shine"></div>
                                        <div class="shadow"></div>
                                        <div class="card-bg">
                                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/513985/pp-front-bg.png" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                        <form className="form">
                            <div class="form-content">
                                <p><strong>About</strong></p>
                                <p>This is a basic concept for a payment, checkout process. The user can select between the different payment types, each type has a seperate form to fill in the required data for the transaction. What I tried to provide:</p>
                                <ul>
                                    <li>A quick and easy way to fill the required form fields.</li>
                                    <li>Mobile friendly keyboard display</li>
                                    <li>Disabling auto-correction and spellcheck for names</li>
                                    <li>Avoid dropdown fields for a better UX.</li>
                                </ul>
                            </div>
                        </form>
                    </div>
                </li>
                <li class="paymenttype selected cc">
                    <div class="box">
                        <header>
                            <div class="card" id="cc-card">
                                <div class="flipper">
                                    <div class="front">
                                        <div class="shine"></div>
                                        <div class="shadow"></div>
                                        <div class="card-bg">
                                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/513985/cc-front-bg.png" />
                                        </div>
                                        <div class="card-content">
                                            <div class="credit-card-type"></div>
                                            <div class="card-number">
                                                <span>1234 1234 1234 1234</span>
                                                <span>1234 1234 1234 1234</span>
                                            </div>
                                            <div class="card-holder">
                                                <em>Card holder</em>
                                                <span>Your Name</span>
                                                <span>Your Name</span>
                                            </div>
                                            <div class="validuntil">
                                                <em>Expire</em>
                                                <div class="e-month">
                                                    <span>
                                                        MM
                                                    </span>
                                                    <span>
                                                        MM
                                                    </span>
                                                </div>
                                                <div class="e-divider">
                                                    <span>
                                                        /
                                                    </span>
                                                    <span>
                                                        /
                                                    </span>
                                                </div>
                                                <div class="e-year">
                                                    <span>
                                                        YY
                                                    </span>
                                                    <span>
                                                        YY
                                                    </span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div class="back">
                                        <div class="shine"></div>
                                        <div class="shadow"></div>
                                        <div class="card-bg">
                                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/513985/cc-back-bg-new.png" />
                                        </div>
                                        <div class="ccv">
                                            <em>CCV Number</em>
                                            <strong></strong>
                                        </div>
                                        <div class="card-content">
                                            <div class="card-number">
                                                <span>4111 1111 1111 1111</span>
                                                <span>4111 1111 1111 1111</span>
                                            </div>
                                            <div class="card-holder">
                                                <span>Your Name</span>
                                                <span>Your Name</span>
                                            </div>
                                            <div class="validuntil">
                                                <span>
                                                    <strong class="e-month">MM</strong> /                 <strong class="e-year">YY</strong>
                                                </span>
                                                <span>
                                                    <strong class="e-month">MM</strong> /
                                                    <strong class="e-year">YY</strong>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>

                        <form className="form">
                            <div class="form-content">
                                <div class="field">
                                    <input type="tel" id="cardnumber" maxlength="20" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                                    <span class="focus-bar"></span>
                                    <label for="cardnumber">Card number</label>
                                </div>
                                <div class="field">
                                    <input type="text" autocorrect="off" spellcheck="false" value={cardName} onChange={(e) => setCardName(e.target.value)} id="cardholder" maxlength="25" />
                                    <span class="focus-bar"></span>
                                    <label for="cardholder">Card holder (Name on card)</label>
                                </div>
                                <div class="field-group">
                                    <div class="col-50">
                                        <label for="expires-month">Expire (Valid until)</label>
                                        <div class="field expire-date">
                                            <div>
                                                <input type="tel" id="expires-month" placeholder="MM" allowed-pattern="[0-9]" maxlength="2" />
                                                <span class="focus-bar"></span>
                                            </div>
                                            <div class="divider">/</div>
                                            <div>
                                                <input type="tel" id="expires-year" placeholder="YY" allowed-pattern="[0-9]" maxlength="2" />
                                                <span class="focus-bar"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-50">
                                        <div class="field ccv">
                                            <input type="tel" id="ccv" value={cvv} onChange={(e) => setCvv(e.target.value)} autocomplete="off" maxlength="3" />
                                            <span class="focus-bar"></span>
                                            <label for="ccv">CVV</label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                </li>
                <li class="paymenttype ec unselected-right">
                    <div class="box">
                        <header>
                            <div class="card" id="ec-card">
                                <div class="flipper">
                                    <div class="front">
                                        <div class="shine"></div>
                                        <div class="shadow"></div>
                                        <div class="card-bg">
                                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/513985/ec-front-bg.png" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                        <form className="form">
                            <div class="form-content">
                                <p><strong>This is just a demo</strong></p>
                                <p>It is neither complete, nor optimized code. In CSS it is playing around with text-shadow, transformations, transitions and a few animations. Some quick coded JavaScript to handle the required interactions. Anyway it might be an inspiration or a starting point.</p>
                                <p>Made with &#10084; by webandapp.fr</p>
                            </div>
                        </form>
                    </div>
                </li>
            </ul>
            <div style={{ marginTop: "-60px" }}>
                <Button type="primary" onClick={() => handleCreateOrder()}>
                    Done
                </Button>
                <Button
                    style={{
                        margin: '0 8px',
                    }}
                    onClick={() => props.handlePrev()}
                >
                    Previous
                </Button>
            </div>
        </div>
    )
}
