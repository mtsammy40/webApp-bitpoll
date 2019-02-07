//Institution
<FormGroup>
<Label for="imgtb">Logo</Label>
<Input type="file" name="img" id="imgtb" onChange={this.handleChange} />
<FormText color="muted">
    What logo would you like for your profile?
</FormText>
<img className="img-circle img-responsive" src={this.state.img} alt="preview" />
</FormGroup>

//Election
<FormGroup>
                        <Label for="imgtb">Cover Image</Label>
                        <Input type="file" name="img" id="imgtb" onChange={this.handleChange} />
                        <FormText color="muted">
                            What image would you like for your profile?
                        </FormText>
                        <img className="img-circle img-responsive" src={this.state.img} alt="preview" />
                    </FormGroup>
//voter
<FormGroup>
          <Label for="filetb">File</Label>
          <Input type="file" name="file" placeholder="images" id="filetb" onChange={this.handleChange} />
          <FormText color="muted">
            What image would you like for your profile?
          </FormText>
          <img className="img-circle img-responsive" src={this.state.file} alt="preview"/>
        </FormGroup>