import {
  buildClubRoute,
  CLUB_MISSION_LIBRARY,
  getMissionPoolSize,
} from './clubRoute'

describe('club route', () => {
  test('rotates missions without immediate repeats for each track', () => {
    const firstRoute = buildClubRoute(undefined, () => 0)
    const secondRoute = buildClubRoute(firstRoute.history, () => 0)
    const firstIds = Object.fromEntries(
      firstRoute.route.map((mission) => [mission.track, mission.id])
    )
    const secondIds = Object.fromEntries(
      secondRoute.route.map((mission) => [mission.track, mission.id])
    )

    expect(secondIds.ai).not.toBe(firstIds.ai)
    expect(secondIds.networks).not.toBe(firstIds.networks)
    expect(secondIds.security).not.toBe(firstIds.security)
  })

  test('resets track history only after exhausting the pool', () => {
    let nextRoute = buildClubRoute(undefined, () => 0)

    for (let index = 1; index < CLUB_MISSION_LIBRARY.ai.length; index++) {
      nextRoute = buildClubRoute(nextRoute.history, () => 0)
    }

    expect(nextRoute.history.ai).toHaveLength(CLUB_MISSION_LIBRARY.ai.length)
    expect(nextRoute.history.networks).toHaveLength(
      CLUB_MISSION_LIBRARY.networks.length
    )
    expect(nextRoute.history.security).toHaveLength(
      CLUB_MISSION_LIBRARY.security.length
    )

    const resetRoute = buildClubRoute(nextRoute.history, () => 0)

    expect(resetRoute.history.ai).toEqual([CLUB_MISSION_LIBRARY.ai[0].id])
    expect(resetRoute.history.networks).toEqual([
      CLUB_MISSION_LIBRARY.networks[0].id,
    ])
    expect(resetRoute.history.security).toEqual([
      CLUB_MISSION_LIBRARY.security[0].id,
    ])
  })

  test('reports the total number of missions in the pool', () => {
    expect(getMissionPoolSize()).toBe(18)
  })
})
