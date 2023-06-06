import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
}

class TravelGuide extends Component {
  state = {
    apiStatus: apiConstants.initial,
    travelGuideApiData: [],
  }

  componentDidMount() {
    this.renderApi()
  }

  renderApi = async () => {
    this.setState({
      apiStatus: apiConstants.inProgress,
    })
    const options = {
      method: 'GET',
    }
    const response = await fetch('https://apis.ccbp.in/tg/packages', options)
    const data = await response.json()

    const updatedData = data.packages.map(eachPackage => ({
      id: eachPackage.id,
      description: eachPackage.description,
      imageUrl: eachPackage.image_url,
      name: eachPackage.name,
    }))
    console.log(updatedData)
    this.setState({
      travelGuideApiData: updatedData,
      apiStatus: apiConstants.success,
    })
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  showTravelGuide = () => {
    const {travelGuideApiData} = this.state

    return (
      <ul className="ul-container">
        {travelGuideApiData.map(eachItem => (
          <li key={eachItem.id} className="list-item">
            <img className="img" src={eachItem.imageUrl} alt={eachItem.name} />
            <div>
              <h1 className="heading2 para">{eachItem.name}</h1>
              <p className="description para">{eachItem.description}</p>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  renderTravelGuide = () => {
    const {apiStatus} = this.state
    // console.log(apiStatus)
    switch (apiStatus) {
      case apiConstants.success:
        return this.showTravelGuide()
      default:
        return this.renderLoader()
    }
  }

  render() {
    return (
      <div className="bg-container">
        <h1 className="heading">Travel Guide</h1>
        {this.renderTravelGuide()}
      </div>
    )
  }
}

export default TravelGuide
