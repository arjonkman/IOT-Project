function Csv() {
    fetch(`http://127.0.0.1:5000/api/csvfiles`)
      .then((res) => res.json())
      .then((json) => {
        return Csvoptions(json);
      });
  }

function Csvoptions(a) {
    let items = a
    let optionsList = items.length > 0
		  && items.map((item, i) => {
		  return (
		  	<option key={i} value={item.id}>{item.name}</option>
		)
	}, this);}


function Csvfiles() {
    return (
      <select className="form-select form-select-sm">
        <option value="" defaultValue>Select a room</option>
        {Csv()}
      </select>
    )
}

export default Csvfiles