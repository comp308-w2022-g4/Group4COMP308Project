import {} from "react-router-dom";
import { Button } from "react-bootstrap";
import meditation from "../images/Meditation.jpg";
import excercise from "../images/excercise.jpg";
import Game from "../images/game.jpg";

export default function Profile() {
  document.getElementById("Meditation")?.addEventListener("click", () => {
    window.location.href = "https://www.youtube.com/watch?v=inpok4MKVLM";
  });

  document.getElementById("Excercise")?.addEventListener("click", () => {
    window.location.href = "https://youtu.be/q2NZyW5EP5A";
  });
  return (
    <>
      <h1 className="mb-5">Profile</h1>
      <h4>
        Welcome to your personal profile page. Please try out some of our
        motivational/Stress reliever videos and games.
      </h4>

      <div className="container px-4 py-5" id="featured-3">
        <h2 className="pb-2 border-bottom">Daily Mental Health Videos</h2>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="feature col">
            <div className="feature-icon bg-primary bg-gradient">
              <img src={meditation} width="400" height="200"></img>
              <svg className="bi" width="1em" height="1em"></svg>
            </div>
            <h2>Meditation</h2>
            <p>
              Take 5 minutes to sit down, relax and meditate to take a break of
              all the stressful things in life. Taking a break is nessasary for
              a healthy body and mind and to keep motivated to do things in the
              future.
            </p>
            <Button href="https://www.youtube.com/watch?v=inpok4MKVLM">
              Click for Video
            </Button>
          </div>
          <div className="feature col">
            <div className="feature-icon bg-primary bg-gradient">
              <img src={excercise} width="400" height="200"></img>
              <svg className="bi" width="1em" height="1em"></svg>
            </div>
            <h2>Excercise</h2>
            <p>
              Take 5 minutes to do some working out to build your motivation.
              Short excercises can help motivate you into doing your best.
            </p>
            <Button href="https://youtu.be/q2NZyW5EP5A">Click for Video</Button>
          </div>
          <div className="feature col">
            <div className="feature-icon bg-primary bg-gradient">
              <img src={Game} width="400" height="200"></img>
              <svg className="bi" width="1em" height="1em"></svg>
            </div>
            <h2>Video Game</h2>
            <p>
              Stay a while and play a little. Every life needs a little bit of
              play after a tiring day of work. Come take a few minutes to play
              this game to add some fun in your life.
            </p>
            <Button href="https://tetris.com/play-tetris">
              Click for Game
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
