"use client";

import { Reducer, useReducer } from "react";
import { PlayerCoachSelector } from "./join-tournament-form/player-coach-selector";
import { Input } from "./client/input";
import { Label } from "./client/label";
import { PlayerOptions } from "./join-tournament-form/player-options";
import { useSession } from "next-auth/react";
import Button from "./client/button";
import { redirect } from "next/navigation";

type State = {
  joinType: "player" | "coach";
  riotAccount: { region: string; username: string };
  playerData: {
    role?: string;
  };
};

type Action =
  | { type: "edit-join-type"; payload: { type: "player" | "coach" } }
  | {
      type: "edit-riot-account";
      payload: { region?: string; username?: string };
    }
  | { type: "select-player-role"; payload: { role: string } };

const reducer: Reducer<State, Action> = (prevState, action) => {
  switch (action.type) {
    case "edit-join-type": {
      return {
        ...prevState,
        joinType: action.payload.type,
      };
    }

    case "edit-riot-account": {
      return {
        ...prevState,
        riotAccount: {
          ...prevState.riotAccount,
          ...action.payload,
        },
      };
    }

    case "select-player-role": {
      return {
        ...prevState,
        playerData: {
          ...prevState.playerData,
          role: action.payload.role,
        },
      };
    }

    default:
      return prevState;
  }
};

const initialState: State = {
  joinType: "player",
  riotAccount: { region: "NA", username: "" },
  playerData: {},
};

export const JoinTournament: React.FC<{ id: string; name: string }> = ({
  name,
  id,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const session = useSession();

  const onSubmit = async () => {
    try {
      await fetch("/api/tournaments/add-player", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          playerId: session.data?.user.id,
          tournamentId: parseInt(id),
          gamedata: {
            riotAccount: state.riotAccount,
            role: state.playerData.role,
          },
        }),
      });

      redirect("/dashboard");
    } catch (e) {}
  };

  return (
    <div>
      <h3 className="text-sky-600 dark:text-indigo-600">{name}</h3>
      <div className="flex flex-col gap-8">
        <div className="pt-4">
          <PlayerCoachSelector
            setJoinType={(joinType) =>
              dispatch({
                type: "edit-join-type",
                payload: { type: joinType },
              })
            }
            joinType={state.joinType}
          />
        </div>
        <div className="">
          <Label htmlFor="riot-id">Riot Account ID</Label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-indigo-600 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-400 sm:max-w-md">
              <select
                onChange={(e) =>
                  dispatch({
                    type: "edit-riot-account",
                    payload: { region: e.target.value },
                  })
                }
                className="flex select-none items-center pl-3 text-gray-500 dark:text-slate-300 sm:text-sm dark:bg-indigo-600 rounded-l-md ring-1"
                value={state.riotAccount.region}
              >
                <option>NA</option>
                <option>EUW</option>
              </select>
              <Input
                name="riot-id"
                id="riot-id"
                autoComplete="username"
                placeholder="EntryFragger001"
                onChange={(e) =>
                  dispatch({
                    type: "edit-riot-account",
                    payload: { username: e.target.value },
                  })
                }
                value={state.riotAccount.username}
              />
            </div>
          </div>
        </div>
        {state.joinType === "player" && (
          <div>
            <PlayerOptions
              role={state.playerData.role}
              onClickRole={(role) =>
                dispatch({ type: "select-player-role", payload: { role } })
              }
            />
          </div>
        )}
      </div>
      <div className="self-end pt-4">
        <Button onClick={onSubmit}>Submit</Button>
      </div>
    </div>
  );
};
