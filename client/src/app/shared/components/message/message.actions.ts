import { createAction, props } from "@ngrx/store";

export const SetError  = createAction(
    '[Message] Set Error',
    props<{error}>()
)

export const SetInfo = createAction(
    '[Message] Set Info',
    props<{info}>()
)

export const ClearMessage = createAction(
    '[Message] Clear Message'
)