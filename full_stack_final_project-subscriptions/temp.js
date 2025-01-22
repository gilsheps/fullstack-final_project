const mongoose = require('mongoose');
const Subscription = require("./models/subscriptionsModel")
// Assume the Subscriptions model

async function removeDuplicateMoviesInSubscriptions() {
    console.log('removeDuplicateMoviesInSubscriptions start')
    try {
        // Find all subscriptions
        const subscriptions = await Subscription.find();

        for (const subscription of subscriptions) {
            const uniqueMovies = [];
            const seenMovieIds = new Set();

            // Filter out duplicates
            for (const movie of subscription.movies) {
                if (!seenMovieIds.has(movie.movieId.toString())) {
                    uniqueMovies.push(movie);
                    seenMovieIds.add(movie.movieId.toString());
                }
            }

            // Update the document if duplicates were found
            if (uniqueMovies.length !== subscription.movies.length) {
                subscription.movies = uniqueMovies;
                await subscription.save();
                console.log(`Removed duplicates for subscription: ${subscription._id}`);
            }
        }

        console.log('Duplicate removal process completed.');
    } catch (error) {
        console.error('Error removing duplicates:', error);
    }
}

// Run the function
module.exports = removeDuplicateMoviesInSubscriptions;
