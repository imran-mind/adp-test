
import React from 'react';
import _ from 'lodash';
import {Table} from 'react-bootstrap';
import Loader from 'react-loader-spinner'

class Business extends React.Component{

    state = {
        businessList: []
    }

    isValidArray(arr){
        if(arr && arr.length){
            return true
        }
        return false;
    }

    filterTopShops(data){
        const sortedData = _.orderBy(data.businesses, ['rating'], ['desc']);;
        const top5Shops = this.isValidArray(sortedData) ? sortedData.slice(0,5): [];
        this.setState({
            businessList: top5Shops
        });
    }
    componentDidMount(){
        var obj = {  
            method: 'GET',
            headers: {
                'mode': 'no-cors',
                'cache-control': 'no-cache',
                'authorization': 'Bearer 1Zkk4zfB3zlqOEVibmkTMXLlyTc0cKxvUaGBlgVRtLPRQaTbf-KmCLlB6ifM0GDpz1Mb5KuSTyUNyYsxjF1eX1nf9ugPgrYN_ysjxNEqbMNb3z0gmC1bqLvUYhx2XXYx',
                'content-type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        }
        // This is a hack for avoid CORS error
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "https://api.yelp.com/v3/businesses/search?location=Alpharetta&categories=icecream"; // site that doesn’t send Access-Control-*
        fetch(proxyurl + url, obj)
        .then(response => response.json())
        .then(contents => {
            this.filterTopShops(contents);
        })
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    }
    renderShops(shopObj){
        return <React.Fragment>
              <tr key={shopObj.id}>
                 <td>{shopObj.name}</td>
                 <td>{shopObj.rating}</td>
                 <td>{shopObj.location.address1+ ' ' +shopObj.location.country}</td>
             </tr>
         </React.Fragment>
     }
 
     render(){
         return (
             <section>
                 <h1>Top Ice Cream Shops</h1>
                 {
                     this.isValidArray(this.state.businessList) ? 
                     <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Business Name</th>
                            <th>Address</th>
                            <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.isValidArray(this.state.businessList) ? 
                                this.state.businessList.map((shopObj) => {
                                    return this.renderShops(shopObj);
                                })
                        : null}
                        </tbody>
                    </Table>
                    : 
                     <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={100}
                        width={100}
                      /> 
                 }
             </section>
         )
     }
}

export default Business;