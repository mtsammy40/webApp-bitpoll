  function validate(e) {
    const { validate } = this.state;
    switch (e.target.name) {
      case 'phoneNo':
        const phoneRex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (phoneRex.test(e.target.value)) {
          validate.phone = 'has-success'
        } else {
          validate.phone = 'has-danger'
        }
        this.setState({ validate })
        break;
      case 'name':
        const nameRex = /^[a-z ,.'-]+$/i;
        if (nameRex.test(e.target.value)) {
          validate.name = 'has-success'
        } else {
          validate.name = 'has-danger'
        }
        this.setState({ validate });
        break;
      case 'id':
        const idRex = /^[a-z ,.'-]+$/i;
        if (idRex.test(e.target.value)) {
          validate.id = 'has-success'
        } else {
          validate.id = 'has-danger'
        }
        this.setState({ validate });
        break;
      case 'nationalId':
        const nidRex = /^[a-z ,.'-]+$/i;
        if (nidRex.test(e.target.value)) {
          validate.nid = 'has-success'
        } else {
          validate.nid = 'has-danger'
        }
        this.setState({ validate });
        break;
      default:
        break;
    }
}
module.exports = validate;