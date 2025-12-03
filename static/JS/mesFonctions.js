function changerSection()
{
  console.debug(this);
  if(this.id == "nav")
  {
    document.getElementById("Documentation").style.display = "block";
    document.getElementById("inscraboutiption").style.display = "none";
    document.getElementById("contact").style.display = "none";
  }
  else if(this.id == "nav_inscription")
  {
    document.getElementById("mon_cv").style.display = "none";
    document.getElementById("inscription").style.display = "block";
    document.getElementById("connexion").style.display = "none";
  }
  else if(this.id == "nav_connexion")
  {
    document.getElementById("mon_cv").style.display = "none";
    document.getElementById("inscription").style.display = "none";
    document.getElementById("connexion").style.display = "block";
  }
}

(function () {
  function toggleNav() {
    // Define targets
    const button = document.querySelector('.burger-button');
    const target = document.querySelector('#navigation');

    button.addEventListener('click', () => {
      const currentState = target.getAttribute("data-state");

      if (!currentState || currentState === "closed") {
        target.setAttribute("data-state", "opened");
        button.setAttribute("data-expanded", "true");
      } else {
        target.setAttribute("data-state", "closed");
        button.setAttribute("data-expanded", "false");
      }

    });
  } // end toggleNav()

  toggleNav();
}());



document.addEventListener('DOMContentLoaded', function() {
    particlesJS.load('particles', '/static/config/particles.json', function() {
        console.log('✨ Particules chargées !');
    });

});