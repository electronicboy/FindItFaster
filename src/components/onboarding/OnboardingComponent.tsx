"use client";
import React from 'react';
import {Button} from "@/components/ui/button";
import {Box, Card, CardRoot, Fieldset, Input, Stack} from "@chakra-ui/react";
import {Field} from "@/components/ui/field";
import {Alert} from "@/components/ui/alert";

export default function OnboardingComponent({updateAction}: {
    updateAction: (data: FormData) => Promise<{ success: boolean, error?: string }>
}) {
    const [error, setError] = React.useState<string | null>(null);
    const [submitting, setSubmitting] = React.useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        try {
            setSubmitting(true);
            const res = await updateAction(formData);
            if (!res.success && res.error != null) {
                setError(res.error);
            }
        } finally {
            setSubmitting(false);
        }

    }

    return (
        <>
        <div className={"mx-auto w-fit"}>
                <CardRoot className={"w-240"}>

                    <Card.Body>
                        <Box>
                            <form onSubmit={handleSubmit}>
                                <Fieldset.Root size={"lg"} maxW={"md"}>
                                    <Stack>
                                        <Fieldset.Legend>Who are you?</Fieldset.Legend>
                                        <Fieldset.HelperText>
                                            Please tell us about yourself
                                        </Fieldset.HelperText>
                                    </Stack>
                                    <Fieldset.Content>
                                        <Field label={"Name"}>
                                            <Input name={"username"}/>
                                        </Field>
                                    </Fieldset.Content>

                                    <Button loading={submitting} type={"submit"} alignSelf={"flex-start"}>Submit</Button>
                                </Fieldset.Root>
                                {error && (
                                    <Alert title={"Invalid submission"} status={"error"}>
                                        {error}
                                    </Alert>
                                )}
                            </form>
                        </Box>
                    </Card.Body>
                </CardRoot>
        </div>

        </>
    );
}
