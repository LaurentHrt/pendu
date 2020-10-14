import React from "react"
import ReactDOM from "react-dom"
import "./index.css"

const CLAVIER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const MOT_A_TROUVER = "TELEPHONE"

const Mot = ({ value }) => (
  <div>
    {value.split("").map((lettre, index) => (
      <button className="lettre" key={index}>
        {lettre}
      </button>
    ))}
  </div>
)

const Lettre = ({ lettre, onClick, feedback }) => (
  <button
    className={`boutonClavier ${feedback}`}
    onClick={() => onClick(lettre)}
  >
    {lettre}
  </button>
)

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      usedLetters: new Set(),
      nbTry: 0,
    }
  }

  // Arrow fx for binding
  handleClickLettre = (lettre) => {
    if (computeDisplay(MOT_A_TROUVER, this.state.usedLetters).includes("_")) {
      const usedLetters = this.state.usedLetters.add(lettre)
      const nbTry = this.state.nbTry + 1

      this.setState({
        nbTry: nbTry,
        usedLetters: usedLetters,
      })
    }
  }

  restart() {
    this.setState({
      usedLetters: new Set(),
      nbTry: 0,
    })
  }

  computeFeedbackLettre(lettre) {
    return this.state.usedLetters.has(lettre) ? "clique" : "nonClique"
  }

  render() {
    const won = !computeDisplay(MOT_A_TROUVER, this.state.usedLetters).includes(
      "_"
    )

    return (
      <div className="game">
        <div className="affichage">
          <Mot value={computeDisplay(MOT_A_TROUVER, this.state.usedLetters)} />
        </div>
        <div className="nbTry">Nombre d'essai : {this.state.nbTry}</div>
        <div className="clavier">
          {won ? (
            <p>
              Vous avez gagné !
              <button onClick={() => this.restart()}>Recommencer</button>
            </p>
          ) : (
            <div>
              {CLAVIER.split("").map((lettre) => (
                <Lettre
                  lettre={lettre}
                  key={lettre}
                  feedback={this.computeFeedbackLettre(lettre)}
                  onClick={this.handleClickLettre}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}

// Produit une représentation textuelle de l’état de la partie,
// chaque lettre non découverte étant représentée par un _underscore_.
// (CSS assurera de l’espacement entre les lettres pour mieux
// visualiser le tout).
function computeDisplay(phrase, usedLetters) {
  return phrase.replace(/\w/g, (letter) =>
    usedLetters.has(letter) ? letter : "_"
  )
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"))
