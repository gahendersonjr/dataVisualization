/** Class implementing the infoPanel view. */
class InfoPanel {
  /**
   * Creates a infoPanel Object
   */
  constructor() {
  }

  /**
   * Update the info panel to show info about the currently selected world cup
   * @param oneWorldCup the currently selected world cup
   */
  updateInfo(oneWorldCup) {
    console.log(oneWorldCup);
    document.getElementById("edition").innerText = oneWorldCup.EDITION;
    document.getElementById("host").innerText = oneWorldCup.host;
    document.getElementById("winner").innerText = oneWorldCup.winner;
    document.getElementById("silver").innerText = oneWorldCup.runner_up;

    let list = document.getElementById("teams");
    list.innerHTML = '';
    for (let i in oneWorldCup.teams_names){
      let item = document.createElement("li");
      item.innerText = oneWorldCup.teams_names[i];
      list.appendChild(item);
    }
  }

}
