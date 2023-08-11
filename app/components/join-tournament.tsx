"use client";

import classNames from "classnames";
import { Reducer, useReducer } from "react";
import { PlayerCoachSelector } from "./join-tournament-form/player-coach-selector";
import { Input } from "./client/input";
import { Label } from "./client/label";

type State = {
  joinType: "player" | "coach";
  riotAccount: { region: string; username: string };
};

type Action =
  | { type: "edit-join-type"; payload: { type: "player" | "coach" } }
  | {
      type: "edit-riot-account";
      payload: { region?: string; username?: string };
    };
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

    default:
      return prevState;
  }
};

const initialState: State = {
  joinType: "player",
  riotAccount: { region: "NA", username: "" },
};

export const JoinTournament: React.FC<{ name: string }> = ({ name }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h3 className="text-sky-600 dark:text-indigo-600">{name}</h3>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
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
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
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
          </div>
        </div>
      </div>
    </div>
  );
};
