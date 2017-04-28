import * as React from 'react';
import {UIForm, ValidationType} from "../ui/form/form";
import {UITextInput} from "../ui/form/text-input";
import {UIPaymentCardInput} from "../ui/form/payment-card-input";
import {UICardExpiryInput} from "../ui/form/card-expiry-input";
import {UITextArea} from "../ui/form/text-area";
import {UIFormMessage, UIFormMessageType} from "../ui/form/form-message";
import {UiFormCheckbox} from "../ui/form/checkbox";
import {UIFormSelector} from "../ui/form/selector";

export interface Props {

}

export interface State {
	currentTime: number,
	ch: boolean,
	ch1: boolean,
	selKey: number
}

export class AppComponent extends React.Component<Props, State> {
	state: State = {
		currentTime: 0,
		ch: false,
		ch1: true,
		selKey: 0
	};

	private onValid(): void {

	}

	public render() {

		return (
			<div>
				<div className="container">
					<h1>React-valid-form</h1>
					<div className="form-row">
						<UiFormCheckbox
							checked={this.state.ch}
							name="chk1"
							onChange={(val) => {
								this.setState({
									ch: val
								} as State);
							}}
						/>
					</div>

					<div className="form-row">
						<UiFormCheckbox
							checked={this.state.ch1}
							liner={true}
							name="chk2"
							label="Label 1"
							onChange={(val) => {
								this.setState({
									ch1: val
								} as State);
							}}
						/>
					</div>

					<div className="form-row">
						<UiFormCheckbox
							checked={this.state.ch1}
							liner={true}
							label="label for checkbox"
							name="chk3"
							onChange={(val) => {
								this.setState({
									ch1: val
								} as State);
							}}
						/>
					</div>


					<UIForm onSubmitValid={this.onValid} resetOnSubmitValid={true}>
						<UIFormMessage message="Test message success" type={UIFormMessageType.SUCCESS}/>
						<UIFormMessage message="Test message error" type={UIFormMessageType.ERROR}/>

						<div className="form-row">
							<UITextInput
								name="first"
								type="text"
								placeholder="Some text here..."
								validationTypes={[ValidationType.REQUIRED]}
							/>
						</div>

						<div className="form-row">
							<div className="card-format">
								<div className="left">
									<UIPaymentCardInput
										name="cardtest"
										placeholder="4276 0000 0000 0000"

									/>
								</div>

								<div className="right">
									<UICardExpiryInput name="cardexpiry" placeholder="07 / 17"/>
								</div>
							</div>
						</div>

						<div className="form-row test">
							<UIFormSelector
								items={
									[
										{
											key: 0,
											value: 'First item'
										},
										{
											key: 1,
											value: 'Second item'
										},
										{
											key: 2,
											value: 'Third item'
										},
										{
											key: 3,
											value: 'Fourth item'
										},
										{
											key: 4,
											value: 'Fifth item'
										},
										{
											key: 5,
											value: 'Sixth item'
										},
										{
											key: 6,
											value: 'Seventh item'
										},
									]
								}
								defKey={this.state.selKey}
								onChange={(val: number) => {
									console.log(val);
									this.setState({
										selKey: val
									} as State);
								}}
							/>
						</div>

						<div className="form-row">
							<UITextArea name="text-area"/>
						</div>

						<div className="buttons-block">
							<div className="form-row">
								<label>.btn btn-success</label>
								<button className="btn btn-success" type="submit">Button</button>
							</div>

							<div className="form-row">
								<label>.btn btn-primary</label>
								<button className="btn btn-primary" type="submit">Button</button>
							</div>

							<div className="form-row">
								<label>.btn btn-reset</label>
								<button className="btn btn-reset" type="submit">Button</button>
							</div>

							<div className="form-row">
								<label>.btn btn-danger</label>
								<button className="btn btn-danger" type="submit">Button</button>
							</div>

							<div className="form-row">
								<label>.btn btn-violet</label>
								<button className="btn btn-violet" type="submit">Button</button>
							</div>

							<div className="form-row">
								<label>.btn btn-primary small</label>
								<button className="btn btn-primary small" type="submit">Button</button>
							</div>

							<div className="form-row">
								<label>.btn btn-primary full</label>
								<button className="btn btn-primary full" type="submit">Button</button>
							</div>

							<div className="form-row">
								<label>.btn half-left</label>
								<button className="btn btn-primary half-left" type="submit">Button</button>
							</div>

							<div className="form-row">
								<label>.btn half-right</label>
								<button className="btn btn-primary half-right" type="submit">Button</button>
							</div>

							<div className="form-row">
								<label>.btn btn-primary loading</label>
								<button className="btn btn-primary loading" type="submit">Button</button>
							</div>

							<div className="form-row">
								<label>.btn btn-primary loading</label>
								<button className="btn btn-google" type="submit">Button</button>
							</div>

							<div className="form-row">
								<label>.btn btn-primary loading</label>
								<button className="btn btn-facebook" type="submit">Button</button>
							</div>


						</div>
					</UIForm>
				</div>
			</div>
		);
	}
}