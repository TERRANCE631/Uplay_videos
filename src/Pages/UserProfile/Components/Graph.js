import React from 'react'
import { AnaliticGraph } from './AnaliticGraph'

export function Graph({ dashboardList }) {
    return (
        <section className="m-2">
            <section>
                <AnaliticGraph />
            </section>
        </section>
    )
}
