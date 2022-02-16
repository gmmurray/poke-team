// @ts-ignore

import { Col, Container, Row } from 'react-grid';
import { FC, Fragment } from 'react';

import { IPokeTeamMember } from '../../types/PokeTeamMember';
import classNames from 'classnames';
import { getTypeClass } from '../../utils/getTypeClass';

type PokeTeamType = {
    show: boolean;
    team: IPokeTeamMember[] | null;
    isFull: boolean;
    onRemove: (order: number) => any;
};

const PokeTeam: FC<PokeTeamType> = ({ show, team, isFull, onRemove }) => {
    if (!show) {
        return null;
    } else if (!team) {
        return <h4>you haven't created a team yet</h4>;
    } else if (team.length === 0) {
        return <h4>your team has no members</h4>;
    }

    const teamText = isFull
        ? 'your team is full'
        : 'you can add more pokemon to your team';
    return (
        <Fragment>
            <h4>{teamText}</h4>
            <Container fluid>
                <Row className="poke-team">
                    {team.map((t, i) => (
                        <Col
                            xs={4}
                            md={3}
                            key={i}
                            className={classNames(
                                'poke-team-member-container',
                                'typed-border team',
                                getTypeClass(t.types),
                            )}
                        >
                            <p>{t.name}</p>
                            <button onClick={onRemove(t.order)}>remove</button>
                        </Col>
                    ))}
                </Row>
            </Container>
        </Fragment>
    );
};

export default PokeTeam;
