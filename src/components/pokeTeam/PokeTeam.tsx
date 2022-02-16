// @ts-ignore

import { Col, Container, Row } from 'react-grid';
import { FC } from 'react';
import { IPokeTeamMember } from '../../types/PokeTeamMember';
import classNames from 'classnames';
import { getTypeClass } from '../../utils/getTypeClass';
import PokeButton from '../shared/PokeButton';

type PokeTeamType = {
    show: boolean;
    team: IPokeTeamMember[] | null;
    isFull: boolean;
    onRemove: (order: number) => any;
};

const PokeTeam: FC<PokeTeamType> = ({ show, team, isFull, onRemove }) => {
    if (!team) {
        return <h4>you haven't created a team yet</h4>;
    } else if (team.length === 0) {
        return <h4>your team has no members</h4>;
    }

    const teamText = isFull
        ? 'your team is full'
        : 'you can add more pokemon to your team';
    return (
        <div
            className={classNames({
                'poke-team-container': true,
                '--hidden': !show,
            })}
        >
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
                                'typed-border --team',
                                getTypeClass(t.types),
                            )}
                        >
                            <p>{t.name}</p>
                            <PokeButton onClick={onRemove(t.order)}>
                                remove
                            </PokeButton>
                        </Col>
                    ))}
                </Row>
            </Container>
            <hr />
        </div>
    );
};

export default PokeTeam;
