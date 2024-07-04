function WorkInProgressError({ pageTitle }: { pageTitle: string }) {
    return (
        <div>
            <h1>🚧 Work in progress 🚧</h1>
            <p>{pageTitle} feature is under construction. Please check back later.</p>
        </div>
    );
}

export default WorkInProgressError;