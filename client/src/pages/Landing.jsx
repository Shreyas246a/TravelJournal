import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';  // Keep this import if you use Remixicon icons

import ScrollReveal from 'scrollreveal';

const TourJournal = () => {
  useEffect(() => {
    // Initialize ScrollReveal
    ScrollReveal().reveal('.container__left', { delay: 500 });
    ScrollReveal().reveal('.container__right', { delay: 500 });
  }, []);

  return (
    <div>
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");

          :root {
            --primary-color: #f3eae5;
            --text-dark: #2c2724;
            --white: #ffffff;
            --max-width: 1200px;
          }

          * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
          }

          body {
            font-family: "Montserrat", sans-serif;
          }

          .btn {
            outline: none;
            border: none;
            transition: 0.3s;
            cursor: pointer;
          }

          img {
            display: flex;
            width: 100%;
          }

          a {
            text-decoration: none;
            transition: 0.3s;
          }

          nav {
            position: fixed;
            isolation: isolate;
            width: 100%;
            z-index: 9;
          }

          .nav__header {
            padding: 1rem;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: var(--text-dark);
          }

          .nav__logo a {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--white);
          }

          .nav__menu__btn {
            font-size: 1.5rem;
            color: var(--white);
            cursor: pointer;
          }

          .nav__links {
            position: absolute;
            top: 60px;
            left: 0;
            width: 100%;
            padding: 2rem;
            list-style: none;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 2rem;
            background-color: var(--text-dark);
            transition: 0.5s;
            z-index: -1;
            transform: translateY(-100%);
          }

          .nav__links.open {
            transform: translateY(0);
          }

          .nav__links a {
            font-weight: 600;
            color: var(--primary-color);
          }

          .nav__links a:hover {
            color: var(--white);
          }

          .nav__btns {
            display: none;
          }

          .container {
            max-width: var(--max-width);
            margin: auto;
            padding: 5rem 0;
            position: relative;
            isolation: isolate;
            display: grid;
            gap: 2rem;
            overflow: hidden;
          }

          .container__left {
            padding-inline: 1rem;
            text-align: center;
          }

          .container__left h1 {
            margin-bottom: 2rem;
            font-size: 3.5rem;
            font-weight: 700;
            line-height: 4.5rem;
            color: var(--text-dark);
          }

          .container__left .btn {
            padding: 1rem 2rem;
            letter-spacing: 2px;
            color: var(--white);
            background-color: var(--text-dark);
            border-radius: 5rem;
          }

          .container__left .btn:hover {
            color: var(--text-dark);
            background-color: var(#ffffff);
          }

          .container__right {
            position: relative;
            isolation: isolate;
            display: grid;
            gap: 2rem;
          }

          .container__right::before {
            position: absolute;
            content: "";
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            transform-origin: left;
            height: 80%;
            background-color: var(--purple);
            border-radius: 1rem;
            z-index: -1;

            animation: show 0.75s 1.25s ease-in-out forwards;
          }

          @keyframes show {
            0% {
              width: 0;
            }
            100% {
              width: calc(100% - 2rem);
            }
          }

          .images {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .tent-1 {
            max-width: 300px;
            transform: translateX(1rem);
            border-radius: 1rem;
            box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.2);
          }

          .tent-2 {
            max-width: 180px;
            transform: translateX(-1rem);
            border-radius: 1rem;
            box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.2);
          }

          .content {
            padding-block: 0 5rem;
            padding-inline: 2rem;
            text-align: center;
          }

          .content h4 {
            margin-bottom: 1rem;
            font-size: 1rem;
            font-weight: 500;
            color: var(--white);
          }

          .content h2 {
            margin-bottom: 0.5rem;
            font-size: 2rem;
            font-weight: 700;
            letter-spacing: 2px;
            color: var(--white);
          }

          .content h3 {
            margin-bottom: 1rem;
            font-size: 1rem;
            font-weight: 600;
            color: var(--white);
          }

          .content p {
            line-height: 1.75rem;
            color: var(--white);
          }

          .content hr {
            margin: 10px 0;
          }

          .location {
            position: absolute;
            left: 1rem;
            bottom: 1rem;
            padding: 1rem 2rem 1rem 1rem;
            border-radius: 1rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            font-size: 0.9rem;
            font-weight: 600;
            color: var(--text-dark);
            background-color: var(--primary-color);
            border: 10px solid var(--white);
            border-bottom: none;
          }

          .location span {
            padding: 5px 10px;
            font-size: 1.5rem;
            color: var(--text-dark);
            background-color: var(--white);
            border-radius: 10px;
          }

          @media (width > 768px) {
            nav {
              position: static;
              padding: 2rem 1rem;
              max-width: var(--max-width);
              margin-inline: auto;
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 2rem;
            }

            .nav__header {
              flex: 1;
              padding: 0;
              background-color: transparent;
            }

            .nav__logo a {
              color: var(--text-dark);
            }

            .nav__menu__btn {
              display: none;
            }

            .nav__links {
              position: static;
              padding: 0;
              flex-direction: row;
              background-color: transparent;
              transform: none;
            }

            .nav__links a,
            .nav__links a:hover {
              color: var(--text-dark);
            }

            .nav__btns {
              flex: 1;
              display: flex;
              align-items: center;
              gap: 1rem;
            }

            .nav__btns .btn {
              font-size: 1.5rem;
              color: var(--text-dark);
              background-color: transparent;
            }

            .container {
              grid-template-columns: 2fr 3fr;
              align-items: center;
              padding: 2rem 0;
            }

            .container__left {
              text-align: left;
            }
          }

          @media (width > 1024px) {
            .container__right {
              grid-template-columns: 1fr 2fr;
              align-items: center;
            }

            .container__right::before {
              bottom: unset;
              top: 0;
              height: 90%;
            }

            .images {
              flex-direction: column;
            }

            .tent-1 {
              width: calc(100% + 10rem);
              max-width: 325px;
              transform: translate(-2rem, 2rem);
            }

            .tent-2 {
              max-width: 200px;
              transform: translate(4rem, -1rem);
            }

            .content {
              padding-block: 5rem;
              text-align: left;
              max-width: 400px;
              margin-inline-start: unset;
            }
          }
        `}
      </style>
      

      <div className="container">
        <div className="container__left">
          <h1>Travel Journal <br />Your Trip <br />Your STORY</h1>
          <div className="container__btn">
            <Link to={'/Register'}>
            <button className="btn">SIGN UP</button>
            </Link>
          </div>
        </div>
        <div className="container__right">
          <div className="images">
            <img src="image2.jpg" alt="tent-1" className="tent-1" />
            <img src="image1.jpg" alt="tent-2" className="tent-2" />
          </div>
          <div className="content">
            <h4>Welcome!</h4>
            <h2>THE Experience</h2>
            <h3>Your Tour journal</h3>
            <p>
              Designed for those who want to write down their memories and the joy they experienced, store it like a shelf! and preserve it for your future or to start a new one :)))
              <hr />
              Our selection of simple interface offers you comfort and reliability without unnecessary details.
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default TourJournal;
