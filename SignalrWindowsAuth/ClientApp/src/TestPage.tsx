import * as React from 'react';
import { connectSignalR, query } from './connectivity';

interface IState {
    result1?: string;
    result2?: string;
    result3?: string;
    result4?: string;
}

interface IApiResponse {
    result: string;
}

export class TestPage extends React.PureComponent<{}, IState> {
    constructor(props: {}) {
        super(props);

        this.state = {

        };
    }

    public render() {

        const query1 = () => query<IApiResponse>('api/Anon/Unauthorised')
            .then(data => {
                this.setState({
                    result1: data.result
                })
            })

        const query2 = () => query<IApiResponse>('api/Auth/Authorised')
            .then(data => {
                this.setState({
                    result2: data.result
                })
            })

        const query3 = () => {
            const connection = connectSignalR('hub/Anon');
            connection.start()
                .then(() => {
                    connection.invoke('DoSomething', 'test')
                        .then(() => {
                            connection.stop();
                        });
                });

            // show progress messages from the server
            connection.on('Start', (value: string) => {
                this.setState({
                    result3: value
                });
            });

            connection.on('End', (value: string) => {
                this.setState({
                    result3: value
                });
            });
        }

        const query4 = () => {
            const connection = connectSignalR('hub/Auth');
            connection.start()
                .then(() => {
                    connection.invoke('DoSomething', 'test')
                        .then(() => {
                            connection.stop();
                        });
                });

            // show progress messages from the server
            connection.on('Start', (value: string) => {
                this.setState({
                    result4: value
                });
            });

            connection.on('End', (value: string) => {
                this.setState({
                    result4: value
                });
            });
        }

        const result1 = this.state.result1 === undefined
            ? undefined
            : <div>Result: {this.state.result1}</div>

        const result2 = this.state.result2 === undefined
            ? undefined
            : <div>Result: {this.state.result2}</div>

        const result3 = this.state.result3 === undefined
            ? undefined
            : <div>Result: {this.state.result3}</div>

        const result4 = this.state.result4 === undefined
            ? undefined
            : <div>Result: {this.state.result4}</div>

        const itemStyle = {
            marginBottom: '5em',
        };

        return (
            <div>
                <div style={itemStyle}>
                    <button onClick={query1}>Unauthenticated controller</button>
                    {result1}
                </div>

                <div style={itemStyle}>
                    <button onClick={query2}>Authenticated controller</button>
                    {result2}
                </div>

                <div style={itemStyle}>
                    <button onClick={query3}>Unauthenticated hub</button>
                    {result3}
                </div>

                <div style={itemStyle}>
                    <button onClick={query4}>Authenticated hub</button>
                    {result4}
                </div>
            </div>
        );
    }
}