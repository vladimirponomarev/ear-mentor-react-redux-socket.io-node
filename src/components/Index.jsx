import React from 'react';
import Settings from '../containers/Settings.jsx';


const Index = () => (
  <div className="container content">
    <div className="row">

      <div className="col-sm-12 col-md-6 col-lg-7">
        <div className="row">
          <div className="col-sm-12">
            <h1 className="hero__title">Master Relative Pitch.</h1>
            <h2 className="hero__subtitle">
              Train your ear in a game form and compare your results with people all over the world.
            </h2>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-lg-7">
            <h3>Why Train Ear?</h3>
            <p>
              On Ear Mentor you can practice relative pitch by trying to determine the distance
              between notes. With a well-developed ear you can learn to play your favorite songs
              just by ear, without any tabs or sheet music.
            </p>
          </div>
          <div className="col-sm-12 col-lg-5 text-center">
            <img className="notes-promo" alt="Notes" src="/img/notes.png" />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <h3>How to Use Ear Mentor</h3>
            <p>
              To start training, decide what intervals you want to practice, which instrument you
              want to hear and fill your name and country you represents—it’s for comparing
              your result with other players in the rating table.
            </p>

            <p>
              At the moment of the game, your goal is to determine the intervals between notes. If
              the answer is correct you’ll get points, the amount of which based on how many
              intervals you have selected. If the answer is wrong you’ll get a second try. If the
              second answer is correct, you won’t get any points but you’ll be able to continue
              the game. But if your second answer is wrong, you’ll lose the game. You still can
              start over again!
            </p>

          </div>
        </div>
      </div>

      <div className="col-sm-12 col-md-6 col-lg-5">
        <Settings />
      </div>

    </div>
  </div>
);


export default Index;
